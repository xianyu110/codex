(function () {
    const allowedRoots = ['docs/', 'recipes/', 'reference/'];
    const params = new URLSearchParams(window.location.search);
    const rawFile = params.get('file') || 'docs/index.md';
    const file = normalizePath(rawFile);
    const body = document.getElementById('article-body');
    const filePath = document.getElementById('file-path');
    const backLink = document.getElementById('back-link');
    const tocList = document.getElementById('toc-list');

    if (!isAllowed(file)) {
        renderError('路径不在教程目录内。');
        return;
    }

    filePath.textContent = file;
    backLink.href = backHref(file);

    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.text();
        })
        .then(markdown => {
            body.innerHTML = renderMarkdown(markdown, file);
            buildToc();
            document.title = `${firstHeading(markdown) || 'Codex 教程'} | Codex 国内站`;
        })
        .catch(error => {
            renderError(`无法加载 ${file}：${error.message}`);
        });

    function normalizePath(path) {
        return path.replace(/^\/+/, '').replace(/\\/g, '/').replace(/\/{2,}/g, '/');
    }

    function isAllowed(path) {
        return allowedRoots.some(root => path.startsWith(root)) && !path.includes('..') && path.endsWith('.md');
    }

    function backHref(path) {
        if (path.startsWith('recipes/')) return 'recipes/';
        if (path.startsWith('reference/')) return 'reference/';
        return 'docs/';
    }

    function renderError(message) {
        body.innerHTML = `<div class="error">${escapeHtml(message)}</div>`;
        tocList.innerHTML = '';
    }

    function firstHeading(markdown) {
        const match = markdown.match(/^#\s+(.+)$/m);
        return match ? stripMarkdown(match[1]).trim() : '';
    }

    function renderMarkdown(markdown, currentFile) {
        const lines = markdown.replace(/\r\n/g, '\n').split('\n');
        const html = [];
        let paragraph = [];
        let list = null;
        let inCode = false;
        let codeLang = '';
        let codeLines = [];
        let blockquote = [];

        function flushParagraph() {
            if (!paragraph.length) return;
            html.push(`<p>${inline(paragraph.join(' '), currentFile)}</p>`);
            paragraph = [];
        }

        function flushList() {
            if (!list) return;
            html.push(`<${list.type}>${list.items.map(item => `<li>${inline(item, currentFile)}</li>`).join('')}</${list.type}>`);
            list = null;
        }

        function flushBlockquote() {
            if (!blockquote.length) return;
            html.push(`<blockquote>${blockquote.map(line => `<p>${inline(line, currentFile)}</p>`).join('')}</blockquote>`);
            blockquote = [];
        }

        function flushCode() {
            html.push(`<pre><code${codeLang ? ` class="language-${escapeAttr(codeLang)}"` : ''}>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
            codeLines = [];
            codeLang = '';
        }

        for (let i = 0; i < lines.length; i += 1) {
            const line = lines[i];

            if (line.startsWith('```')) {
                if (inCode) {
                    flushCode();
                    inCode = false;
                } else {
                    flushParagraph();
                    flushList();
                    flushBlockquote();
                    inCode = true;
                    codeLang = line.replace(/^```/, '').trim();
                }
                continue;
            }

            if (inCode) {
                codeLines.push(line);
                continue;
            }

            if (!line.trim()) {
                flushParagraph();
                flushList();
                flushBlockquote();
                continue;
            }

            if (line.startsWith('> ')) {
                flushParagraph();
                flushList();
                blockquote.push(line.slice(2).trim());
                continue;
            }

            const heading = line.match(/^(#{1,4})\s+(.+)$/);
            if (heading) {
                flushParagraph();
                flushList();
                flushBlockquote();
                const level = Math.min(heading[1].length, 3);
                const text = stripMarkdown(heading[2]).trim();
                const id = slug(text);
                html.push(`<h${level} id="${escapeAttr(id)}">${inline(heading[2], currentFile)}</h${level}>`);
                continue;
            }

            if (isTableStart(lines, i)) {
                flushParagraph();
                flushList();
                flushBlockquote();
                const table = consumeTable(lines, i, currentFile);
                html.push(table.html);
                i = table.nextIndex - 1;
                continue;
            }

            const ordered = line.match(/^\d+\.\s+(.+)$/);
            const unordered = line.match(/^[-*]\s+(.+)$/);
            if (ordered || unordered) {
                flushParagraph();
                flushBlockquote();
                const type = ordered ? 'ol' : 'ul';
                if (!list || list.type !== type) {
                    flushList();
                    list = { type, items: [] };
                }
                list.items.push((ordered || unordered)[1]);
                continue;
            }

            paragraph.push(line.trim());
        }

        if (inCode) flushCode();
        flushParagraph();
        flushList();
        flushBlockquote();

        return html.join('\n');
    }

    function isTableStart(lines, index) {
        return lines[index] && lines[index].includes('|') &&
            lines[index + 1] && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1]);
    }

    function consumeTable(lines, start, currentFile) {
        const rows = [];
        let index = start;
        while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
            rows.push(splitTableRow(lines[index]));
            index += 1;
        }

        const header = rows[0] || [];
        const bodyRows = rows.slice(2);
        const thead = `<thead><tr>${header.map(cell => `<th>${inline(cell, currentFile)}</th>`).join('')}</tr></thead>`;
        const tbody = `<tbody>${bodyRows.map(row => `<tr>${row.map(cell => `<td>${inline(cell, currentFile)}</td>`).join('')}</tr>`).join('')}</tbody>`;
        return { html: `<table>${thead}${tbody}</table>`, nextIndex: index };
    }

    function splitTableRow(line) {
        return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim());
    }

    function inline(text, currentFile) {
        let output = escapeHtml(text);

        output = output.replace(/`([^`]+)`/g, '<code>$1</code>');
        output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        output = output.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        output = output.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function (_, alt, href) {
            return `<img src="${escapeAttr(resolveLink(href, currentFile))}" alt="${escapeAttr(alt)}">`;
        });
        output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, label, href) {
            const resolved = resolveLink(href, currentFile);
            const external = /^https?:\/\//.test(resolved) ? ' target="_blank" rel="noopener noreferrer"' : '';
            return `<a href="${escapeAttr(resolved)}"${external}>${label}</a>`;
        });

        return output;
    }

    function resolveLink(href, currentFile) {
        if (/^(https?:|mailto:|#)/.test(href)) return href;
        const cleanHref = href.replace(/^\.?\//, '');
        const currentDir = currentFile.split('/').slice(0, -1).join('/');
        const resolved = normalizePath(`${currentDir}/${cleanHref}`);

        if (resolved.endsWith('.md') && isAllowed(resolved)) {
            return `reader.html?file=${encodeURIComponent(resolved)}`;
        }

        return resolved;
    }

    function stripMarkdown(text) {
        return text.replace(/[`*_#\[\]()]/g, '');
    }

    function slug(text) {
        const value = text.toLowerCase().trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
        return value || `section-${Math.random().toString(36).slice(2, 8)}`;
    }

    function buildToc() {
        const headings = body.querySelectorAll('h2, h3');
        tocList.innerHTML = Array.from(headings).map(heading => {
            return `<a class="level-${heading.tagName === 'H3' ? '3' : '2'}" href="#${escapeAttr(heading.id)}">${escapeHtml(heading.textContent)}</a>`;
        }).join('') || '<p class="file-path">本页没有二级标题。</p>';
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeAttr(value) {
        return escapeHtml(value).replace(/`/g, '&#96;');
    }
}());
