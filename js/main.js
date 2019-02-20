/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
  'use strict';
  init();

  function init() {

    themeManager.init();

    (document.getElementById('chk_round')).checked = JSON.parse(localStorage.getItem('chk_round_val'));

    $('#btn_calc').click(function () {
      var elem = document.getElementById('fld_val');

      elem.value = evalCalc(elem.value);
      elem.focus();
    });

    $('#btn_convert').click(function () {
      var elem = document.getElementById('fld_val');
      var conv = document.getElementById('sel_convert');

      elem.value = convert(elem.value, conv.value);
      elem.focus();
    });
    document.getElementById('fld_val').addEventListener('keyup', function (e) {
      let fld_result = document.getElementById('fld_result');
      fld_result.value = evalCalc(this.value);
    });

    /*    document.getElementById('fld_val').onkeydown = function (e) {
     // alert( e.which);
     if (e.keyCode == 13) {
     this.value = evalCalc(this.value);
     return false;
     }
     };*/

    document.getElementById('fld_val').onkeypress = function (e) {
      e = e || event;

      if (e.ctrlKey || e.altKey || e.metaKey) return;

      var chr = getChar(e);

      // с null надо осторожно в неравенствах, т.к. например null >= '0' => true!
      // на всякий случай лучше вынести проверку chr == null отдельно
      if (h == null) return;

      if ((h < '0' || h > '9') &&
          h != '.' && h != ',' && h != '+' && h != '-' && h != '*' && h != '/' && h != '(' && h != ')') {
        return false;
      }

    };

    $('#chk_round').click(function () {
      if (window.sessionStorage && window.localStorage) {
        //objects sessionStorage and localtorage is supported
        var chkRound = document.getElementById('chk_round');
        localStorage.setItem('chk_round_val', chkRound.checked);
      } else {
        //objects sessionStorage and localtorage does not supported
      }
    });

    $('#btn_refrash').click(reloadPanel);
  }

  /**
   * строковый калькулятор на eval(string)
   * @param {String} str - можно '+'; '-'; '*'; '/'; ','; '.'; '(' expression ')'
   * @return {Number/String} result / ''
   * */
  function evalCalc(str) {
    var chkRound = document.getElementById('chk_round');
    var newStr = str.replace(/,/gmi, '.'); // a little tweak
    var result = +(eval(newStr));
    //  result = result.toFixed ( 3 ); // todo: опускать последние нули
    if (chkRound.checked) {
      result = Math.round(result);
    }
    if (isNum(result)) {
      return result;
    } else {
      return '';
    }

    function isNum(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

  }

  function convert(val, convType) {
    var C_TO_J = 4.1868; // 1 кал = 4,1868 Дж
    var J_TO_K = 0.2388458966275; // 1 J = 0.2388458966275 cal
    var result = '';
    switch (convType) {
      case 'Joules to Calories':
        result = val * J_TO_K;
        break;
      case 'Calories to Joules':
        result = val * C_TO_J;
        break;
      default:
        break;
    }
    return result;
  }

  function getChar(event) {

    if (event.which != 0 && event.charCode != 0) {
      if (event.which < 32) return null;
      return String.fromCharCode(event.which);
    }

    // return null; // специальная клавиша
  }

  // Reloads extension panel
  function reloadPanel() {
    location.reload();
  }

}());
    
