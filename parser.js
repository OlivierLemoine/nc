exports.parse = s => {
    let res = {
        definitions: [],
        actions: [],
    };

    for (let i = 0; i < s.children.length; i++) {
        let e = s.children[i];
        if (typeof e === 'string') {
            if (e.match('class ')) {
                let className = e.slice(6).trim();
                if (className === '') throw 'Expected a valid class name';

                let { definitions, actions } = exports.parse(s.children[i + 1]);

                res.definitions.push({
                    type: 'class',
                    name: className,
                    definitions,
                });
                i++;
            } else if (e.match('function ')) {
                let functionName = e.slice(9).trim();
                if (functionName === '') throw 'Expected a valid function name';

                let { definitions, actions } = exports.parse(s.children[i + 3]);

                res.definitions.push({
                    type: 'function',
                    name: functionName,
                    actions,
                    definitions,
                    return: '',
                });
                i += 3;
            } else if (e.match('let ')) {
                let variableName = e.slice(4).trim();
                if (variableName === '') throw 'Expected a valid variable name';
                res.actions.push({
                    type: 'create_variable',
                    name: variableName,
                });
                if (typeof s.children[i + 1] !== 'string') i++;
                if (typeof s.children[i + 1] !== 'string') i++;
            } else {
                if (
                    typeof s.children[i + 1] !== 'string' &&
                    typeof s.children[i + 1] !== 'undefined'
                ) {
                    if (s.children[i + 1].tag === '(') {
                        if (
                            typeof s.children[i + 2] === 'string' &&
                            s.children[i + 2].trim().match('->')
                        ) {
                            let { definitions, actions } = exports.parse(
                                s.children[i + 1],
                            );

                            res.actions.push({
                                actions: 'redefine_variable',
                                type: 'function',
                                name: '',
                                actions: [],
                                definitions,
                                return: '',
                            });
                        } else {
                            res.actions.push({
                                actions: 'function_call',
                                name: e.trim(),
                            });
                        }
                    }
                    i++;
                }
                if (typeof s.children[i + 1] !== 'string') i++;
            }
        } else {
            throw 'Unexpected token';
        }
    }
    return res;
};
