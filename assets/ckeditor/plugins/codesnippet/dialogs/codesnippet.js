/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

(function() {
    CKEDITOR.dialog.add('codeSnippet', function(editor) {
        var snippetLangs = editor._.codesnippet.langs,
            lang = editor.lang.codesnippet,
            clientHeight = document.documentElement.clientHeight,
            langSelectItems = [],
            styleSelectItems = [],
            snippetLangId;

        // highlight.js : ace.js
        var languages = {
            apache: 'apache_conf',
            bash: 'sh',
            cpp: 'c_cpp',
            cs: 'csharp',
            css: 'css',
            diff: 'diff',
            groovy: 'groovy',
            html: 'html',
            ini: 'ini',
            java: 'java',
            javascript: 'javascript',
            json: 'json',
            markdown: 'markdown',
            nginx: 'nginx',
            php: 'php',
            python: 'python',
            sql: 'sql',
            vbscript: 'vbscript',
            xml: 'xml'
        };

        langSelectItems.push([editor.lang.common.notSet, '']);

        for (snippetLangId in snippetLangs)
            langSelectItems.push([snippetLangs[snippetLangId], snippetLangId]);

        styleSelectItems.push(['AndroidStudio', 'androidstudio']);
        styleSelectItems.push(['IDEA', 'idea']);
        styleSelectItems.push(['SchoolBook', 'school-book']);
        styleSelectItems.push(['Shades Of Purple', 'shades-of-purple']);
        styleSelectItems.push(['Rainbow', 'rainbow']);
        styleSelectItems.push(['Ir Black', 'ir-black']);
        styleSelectItems.push(['Gruvbox Light', 'gruvbox-light']);
        styleSelectItems.push(['Brown Paper', 'brown-paper']);

        // Size adjustments.
        var size = CKEDITOR.document.getWindow().getViewPaneSize(),
            // Make it maximum 800px wide, but still fully visible in the viewport.
            width = Math.min(size.width - 70, 800),
            // Make it use 2/3 of the viewport height.
            height = size.height / 1.5;

        // Low resolution settings.
        if (clientHeight < 650) {
            height = clientHeight - 220;
        }

        return {
            title: lang.title,
            minHeight: 500,
            resizable: CKEDITOR.DIALOG_RESIZE_NONE,
            contents: [{
                id: 'info',
                elements: [{
                        id: 'lang',
                        type: 'select',
                        label: lang.language,
                        items: langSelectItems,
                        className: 'cke_pbckcode_form',
                        setup: function(widget) {
                            if (widget.ready && widget.data.lang)
                                this.setValue(widget.data.lang);

                            // The only way to have an empty select value in Firefox is to set a negative selectedIndex.
                            if (CKEDITOR.env.gecko && (!widget.data.lang || !widget.ready))
                                this.getInputElement().$.selectedIndex = -1;
                        },
                        commit: function(widget) {
                            widget.setData('lang', this.getValue());
                        },
                        onChange: function() {
                            if (!!languages[this.getValue()]) {
                                let language = languages[this.getValue()];
                                let frame = document.getElementById("cke_source_editor");
                                // 等待iframe页面加载完成。
                                if (!frame.contentWindow || !frame.contentWindow.setMode) {
                                    let count = 0;
                                    var codesnippet_interval = setInterval(function() {
                                        if (typeof frame.contentWindow.setMode === 'function' || count >= 10) {
                                            frame.contentWindow.setMode(language);
                                            clearInterval(codesnippet_interval);
                                        }
                                        count++;
                                    }, 1000);
                                } else {
                                    frame.contentWindow.setMode(language);
                                }
                            }
                        }
                    },
                    {
                        id: 'style',
                        type: 'select',
                        label: lang.style,
                        items: styleSelectItems,
                        className: 'cke_pbckcode_form',
                        setup: function(widget) {
                            if (widget.ready && widget.data.style)
                                this.setValue(widget.data.style);

                            // The only way to have an empty select value in Firefox is to set a negative selectedIndex.
                            if (CKEDITOR.env.gecko && (!widget.data.style || !widget.ready))
                                this.getInputElement().$.selectedIndex = -1;
                        },
                        commit: function(widget) {
                            if (this.getValue()) {
                                widget.setData('style', this.getValue());
                            } else {
                                widget.setData('style', 'androidstudio');
                            }
                        },
                        onChange: function() {
                        }
                    },
                    {
                        id: 'code-textarea',
                        type: 'html',
                        html: '<iframe src="/javascripts/ckeditor4/plugins/codesnippet/dialogs/ace.html" scrolling="auto" id="cke_source_editor" style="height:470px;width:' + width + 'px;"></iframe>',
                        setup: function(widget) {
                            let frame = document.getElementById("cke_source_editor");
                            // 等待iframe页面加载完成。
                            if (!frame.contentWindow || !frame.contentWindow.setValue) {
                                let count = 0;
                                var codesnippet_interval = setInterval(function() {
                                    if (typeof frame.contentWindow.setValue === 'function' || count >= 10) {
                                        // 设置初始内容。
                                        if (!!widget.data.code) {
                                            frame.contentWindow.setValue(widget.data.code);
                                        } else {
                                            frame.contentWindow.setValue('');
                                        }
                                        clearInterval(codesnippet_interval);
                                    }
                                    count++;
                                }, 1000);
                            } else {
                                // 设置初始内容。
                                if (!!widget.data.code) {
                                    frame.contentWindow.setValue(widget.data.code);
                                } else {
                                    frame.contentWindow.setValue('');
                                }
                            }
                            frame.height = 478;
                        },
                        commit: function(widget) {
                            let frame = document.getElementById("cke_source_editor");
                            widget.setData('code', frame.contentWindow.getValue());
                        }
                    }
                ],
                onLoad: function() {}
            }]
        };
    });
}());