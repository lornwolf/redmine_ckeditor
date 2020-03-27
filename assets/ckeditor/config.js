/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
CKEDITOR.editorConfig = function( config ) {
    // 中国語
    config.language = 'zh-cn';
    // フォント
    config.font_names= '宋体/宋体;宋体（美化）/宋体（美化）;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;MS 明朝/MS Mincho;MS Gothic/MS Gothic;微软雅黑/微软雅黑;メイリオ/メイリオ;' + config.font_names;
    // CKFinder
    config.filebrowserBrowseUrl = 'https://www.lornwolf.cn/ckfinder/ckfinder.html';
    config.filebrowserUploadUrl = 'https://www.lornwolf.cn/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';
    config.filebrowserWindowWidth = '1000';
    config.filebrowserWindowHeight = '700';

    config.removeButtons = 'Anchor';
    config.removePlugins = 'enterkey';
};