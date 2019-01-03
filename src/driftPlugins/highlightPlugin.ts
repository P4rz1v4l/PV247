import { RichUtils } from 'draft-js';
import * as React from 'react';

export const createHighlightPlugin = () => {
    return {
        customStyleMap: {
            HIGHLIGHT: {
                background: '#F15066',
                padding: '0 .3em',
            }
        },

        keyBindingFn: (e: React.KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'h') {
                return 'highlight';
            }

            return;
        },

        handleKeyCommand: (command: string, editorState: any, {setEditorState}: any) => {
            if (command === 'highlight') {
                setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
                return true;
            }

            return false;
        },
    };
};
