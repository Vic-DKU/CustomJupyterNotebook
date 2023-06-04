// leave at least 2 line with only a star on it below, or doc generation fails
/**
 *
 *
 * Placeholder for custom user javascript
 * mainly to be overridden in profile/static/custom/custom.js
 * This will always be an empty file in IPython
 *
 * User could add any javascript in the `profile/static/custom/custom.js` file.
 * It will be executed by the ipython notebook at load time.
 *
 * Same thing with `profile/static/custom/custom.css` to inject custom css into the notebook.
 *
 *
 * The object available at load time depend on the version of IPython in use.
 * there is no guaranties of API stability.
 *
 * The example below explain the principle, and might not be valid.
 *
 * Instances are created after the loading of this file and might need to be accessed using events:
 *     define([
 *        'base/js/namespace',
 *        'base/js/events'
 *     ], function(IPython, events) {
 *         events.on("app_initialized.NotebookApp", function () {
 *             IPython.keyboard_manager....
 *         });
 *     });
 *
 * __Example 1:__
 *
 * Create a custom button in toolbar that execute `%qtconsole` in kernel
 * and hence open a qtconsole attached to the same kernel as the current notebook
 *
 *    define([
 *        'base/js/namespace',
 *        'base/js/events'
 *    ], function(IPython, events) {
 *        events.on('app_initialized.NotebookApp', function(){
 *            IPython.toolbar.add_buttons_group([
 *                {
 *                    'label'   : 'run qtconsole',
 *                    'icon'    : 'icon-terminal', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
 *                    'callback': function () {
 *                        IPython.notebook.kernel.execute('%qtconsole')
 *                    }
 *                }
 *                // add more button here if needed.
 *                ]);
 *        });
 *    });
 *
 * __Example 2:__
 *
 * At the completion of the dashboard loading, load an unofficial javascript extension
 * that is installed in profile/static/custom/
 *
 *    define([
 *        'base/js/events'
 *    ], function(events) {
 *        events.on('app_initialized.DashboardApp', function(){
 *            require(['custom/unofficial_extension.js'])
 *        });
 *    });
 *
 * __Example 3:__
 *
 *  Use `jQuery.getScript(url [, success(script, textStatus, jqXHR)] );`
 *  to load custom script into the notebook.
 *
 *    // to load the metadata ui extension example.
 *    $.getScript('/static/notebook/js/celltoolbarpresets/example.js');
 *    // or
 *    // to load the metadata ui extension to control slideshow mode / reveal js for nbconvert
 *    $.getScript('/static/notebook/js/celltoolbarpresets/slideshow.js');
 *
 *
 * @module IPython
 * @namespace IPython
 * @class customjs
 * @static
 */


/*CUSTOM PROJECT BY 32184656*/

/*구현한 기능 목록*/
//1.동일 선택 기능
//2.탬플릿 - 자동완성
//3.파일 관리 기능
//4.작업이력 출력 - 콘솔


/*동일변수,줄 선택*/
require(["codemirror/keymap/sublime", "notebook/js/cell", "base/js/namespace"],
    function(sublime_keymap, cell, IPython) {
        cell.Cell.options_default.cm_config.keyMap = 'sublime';
        var cells = IPython.notebook.get_cells();
        for(var cl=0; cl< cells.length ; cl++){
            cells[cl].code_mirror.setOption('keyMap', 'sublime');
        }
    }
);


/*탬플릿 기능 - 자동완성&저장*/
//자동완성
//참고사항: """Tab"""" 키를 통해 작동
require(["notebook/js/codecell"], function(codecell) {
    codecell.CodeCell.options_default.cm_config.extraKeys["Tab"] = "autocomplete";
});


/*파일 관리 기능*/
//확장자 직접 지정 필요
require(["base/js/namespace"], function(IPython) {
  IPython.toolbar.add_buttons_group([
    {
      'label'   : 'New File',
      'icon'    : 'fa-file-o',
      'callback': function() {
        var newFileName = prompt("Enter the name of the new file:");
        if (newFileName) {
          IPython.notebook.kernel.execute(`with open('${newFileName}', 'w') as f: f.write('')`);
          console.log("New file created: " + newFileName);
        }
      }
    },
    {
      'label'   : 'Delete File',
      'icon'    : 'fa-trash',
      'callback': function() {
   
        var deleteFileName = prompt("Enter the name of the file to delete:");
        if (deleteFileName) {
          IPython.notebook.kernel.execute(`import os\nos.remove('${deleteFileName}')`);
          console.log("File deleted: " + deleteFileName);
        }
      }
    }
  ]);
});



/*작업이력 관리*/
//콘솔 출력 - 콘솔에서만 확인 가능
require(["base/js/namespace"], function(IPython) {
  var logMessage = "Executed code: " + IPython.notebook.get_selected_cell().get_text();
  console.log(logMessage);
});
