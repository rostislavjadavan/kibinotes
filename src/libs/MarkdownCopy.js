//
// Forked from https://github.com/ReAlign/markdown-it-copy
// because it wasn't working with electronjs :(
//
//
const x = {
    getCodeLang(str = '') {
        // <div class="language-
        // <code class="language-
        // etc.
        const reg = / class="language-([a-z]+)/;
        reg.test(str);
        return RegExp.$1 || '';
    },
    getFragment(str = '') {
        return str ? `<span class="u-mdic-copy-code_lang">${str}</span>` : '';
    },
};
const _ = {
    // generate Unique id
    generateUuid() {
        return `${+Date.now()}-${parseInt(Math.random() * 100000)}`;
    },
    strEncode(str = '') {
        if (!str || str.length === 0) {
            return '';
        }

        return str
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '\'')
            .replace(/"/g, '&quot;');
    },
    getCodeLangFragment(oriStr = '') {
        return x.getFragment(x.getCodeLang(oriStr));
    },
};

const btnCode = atob(`IWZ1bmN0aW9uKHQpe2NvbnN0IGU9e2NvcHk6KHQ9JycsZT0nJyk9Pm5ldyBQcm9taXNlKChjLG8pPT57Y29uc3Qgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpLGQ9ZT9gXG5cbiR7ZX1gOmU7bi52YWx1ZT1gJHt0fSR7ZH1gLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobiksbi5zZWxlY3QoKTt0cnl7Y29uc3QgdD1kb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO2RvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobiksdD9jKCk6bygpfWNhdGNoKHQpe2RvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobiksbygpfX0pLGJ0bkNsaWNrKHQpe2NvbnN0IGM9dCYmdC5kYXRhc2V0P3QuZGF0YXNldDp7fSxvPWMubWRpY05vdGlmeUlkLG49ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobyksZD1jLm1kaWNOb3RpZnlEZWxheSxpPWMubWRpY0NvcHlGYWlsVGV4dDtlLmNvcHkoYy5tZGljQ29udGVudCxjLm1kaWNBdHRhY2hDb250ZW50KS50aGVuKCgpPT57bi5zdHlsZS5kaXNwbGF5PSdibG9jaycsc2V0VGltZW91dCgoKT0+e24uc3R5bGUuZGlzcGxheT0nbm9uZSd9LGQpfSkuY2F0Y2goKCk9PnthbGVydChpKX0pfX07ZS5idG5DbGljayh0KX0odGhpcyk7`)

const LAST_TAG = '</pre>';

const enhance = (render, options = {}) => (...args) => {
    /* args = [tokens, idx, options, env, slf] */
    const {
        btnText = 'copy', // button text
        failText = 'copy fail', // copy-fail text
        successText = 'copy success', // copy-success text
        successTextDelay = 2000, // successText show time [ms]
        extraHtmlBeforeBtn = '', // '' | a html-fragment before <button>
        extraHtmlAfterBtn = '', // '' | a html-fragment after <button>
        showCodeLanguage = false, // false | show code language
        // before [btn || extraHtmlBeforeBtn] | [add-after-1.1.0]
        attachText = '', // '' | some text append copyText
        // Such as: copyright | [add-after-1.2.0]
    } = options;
    const [tokens = {}, idx = 0] = args;
    // origin writed-code
    const attachCont = (typeof attachText === 'string') ? attachText : '';
    const cont = _.strEncode(tokens[idx].content || '');
    const uuid = `j-notify-${_.generateUuid()}`;
    const originResult = render.apply(this, args);
    const langFrag = showCodeLanguage ? _.getCodeLangFragment(originResult) : '';
    const tpls = [
        '<div class="m-mdic-copy-wrapper">',
        `${langFrag}`,
        `${extraHtmlBeforeBtn}`,
        `<div class="u-mdic-copy-notify" id="${uuid}">${successText}</div>`,
        '<button ',
        'class="u-mdic-copy-btn j-mdic-copy-btn" ',
        `data-mdic-content="${cont}" `,
        `data-mdic-attach-content="${attachCont}" `,
        `data-mdic-notify-id="${uuid}" `,
        `data-mdic-notify-delay="${successTextDelay}" `,
        `data-mdic-copy-fail-text="${failText}" `,
        `onclick="${btnCode}">${btnText}</button>`,
        `${extraHtmlAfterBtn}`,
        '</div>',
    ];
    const newResult = originResult.replace(LAST_TAG, `${tpls.join('')}${LAST_TAG}`);

    return newResult;
};


export default (md = {}, options = {}) => {
    const codeBlockRender = md.renderer.rules.code_block;
    const fenceRender = md.renderer.rules.fence;

    md.renderer.rules.code_block = enhance(codeBlockRender, options);
    md.renderer.rules.fence = enhance(fenceRender, options);
};
