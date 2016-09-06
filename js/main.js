/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
  'use strict';

  var str = '';

  // Reloads extension panel
  function reloadPanel () {
    location.reload ();
  }

  /**
   * строковый калькулятор на eval(string)
   * @param {String} str - можно '+'; '-'; '*'; '/'; ','; '.'; '(' expression ')'
   * @return {Number/String} result / ''
   * */
  function evalCalc (str) {
    var chkRound = document.getElementById ('chk_round');
    var newStr   = str.replace (/,/gmi, "."); // a little tweak
    var result   = +(eval (newStr));
    //  result = result.toFixed ( 3 ); // todo: опускать последние нули
    if (chkRound.checked) {
      result = Math.round (result);
    }
    if (isNum (result)) {
      return result;
    } else {
      return '';
    }

    function isNum (n) {
      return !isNaN (parseFloat (n)) && isFinite (n);
    }

  }

  function getChar (event) {

    if (event.which != 0 && event.charCode != 0) {
      if (event.which < 32) return null;
      return String.fromCharCode (event.which);
    }

    // return null; // специальная клавиша
  }

  var csInterface = new CSInterface ();

  function init () {

    themeManager.init ();

    (document.getElementById ('chk_round')).checked = JSON.parse (localStorage.getItem ("chk_round_val"));

    $ ("#btn_calc").click (function () {
      var elem   = document.getElementById ("fld_val");
      elem.value = evalCalc (elem.value);
      elem.focus ();
    });

    document.getElementById ('fld_val').onkeydown = function (e) {
      // alert( e.which);
      if (e.keyCode == 13) {
        this.value = evalCalc (this.value);
        return false;
      }
    }

    document.getElementById ('fld_val').onkeypress = function (e) {

      e = e || event;

      if (e.ctrlKey || e.altKey || e.metaKey) return;

      var chr = getChar (e);

      // с null надо осторожно в неравенствах, т.к. например null >= '0' => true!
      // на всякий случай лучше вынести проверку chr == null отдельно
      if (h == null) return;

      if ((h < '0' || h > '9') &&
        h != '.' && h != ',' && h != '+' && h != '-' && h != '*' && h != '/' && h != '(' && h != ')') {
        return false;
      }

    }

    $ ("#chk_round").click (function () {
      if (window.sessionStorage && window.localStorage) {
        //objects sessionStorage and localtorage is supported
        var chkRound = document.getElementById ('chk_round');
        localStorage.setItem ("chk_round_val", chkRound.checked);
      } else {
        //objects sessionStorage and localtorage does not supported
      }
    })

    $ ("#btn_refrash").click (reloadPanel);
    $ ("#btn_killCEP").click (function () {
      csInterface.evalScript ("killCEP()");
    });

  }

  init ();

} ());
    
