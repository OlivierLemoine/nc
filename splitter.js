exports.split = (s /* : String */) /* : String[] */ => {
    let res = { parent: null, children: [''], tag: '' };

    for (const i of s) {
        if (i === `'`) {
            if (res.tag === `'`) {
                res = res.parent;
                res.children.push('');
            } else {
                res.children.push({ parent: res, children: [''], tag: i });
                res = res.children[res.children.length - 1];
            }
        } else if (i === `"`) {
            if (res.tag === `"`) {
                res = res.parent;
                res.children.push('');
            } else {
                res.children.push({ parent: res, children: [''], tag: i });
                res = res.children[res.children.length - 1];
            }
        } else if (res.tag.match(/'"/g)) {
            res.children[res.children.length - 1] += i;
        } else if (i.match(/^[([{]/g)) {
            let last = res.children.length - 1;
            if (typeof res.children[last] === 'string') {
                res.children[last] = res.children[last].trim();
                if (res.children[last] === '') {
                    res.children.splice(last, 1);
                }
            }

            res.children.push({ parent: res, children: [''], tag: i });
            res = res.children[res.children.length - 1];
        } else if (i.match(/^[)\]}]/g)) {
            if (res.parent === null) throw 'Unexpected token';

            let last = res.children.length - 1;
            if (typeof res.children[last] === 'string') {
                res.children[last] = res.children[last].trim();
                if (res.children[last] === '') {
                    res.children.splice(last, 1);
                }
            }

            switch (res.tag) {
                case '(':
                    if (i === ')') break;
                case '{':
                    if (i === '}') break;
                case '[':
                    if (i === ']') break;
                default:
                    throw 'Unexpected token';
                    break;
            }
            res = res.parent;
            res.children.push('');
        } else if (i.match(/[;,]/g)) {
            let last = res.children.length - 1;
            if (typeof res.children[last] === 'string') {
                res.children[last] = res.children[last].trim();
                if (res.children[last] === '') {
                    res.children.splice(last, 1);
                }
            }
            res.children.push('');
        } else {
            res.children[res.children.length - 1] += i;
        }
    }

    // if (res.parent !== null) throw 'Missing token';
    while (res.parent !== null) {
        res = res.parent;
    }
    return res;
};
