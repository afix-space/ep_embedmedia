$(document).ready(function () {
  $("#insertEmbedMedia").click(function () {
    // Can not use this yet, fix in main etherpad
    // padeditbar.toogleDropDown("embedMediaModal");

    var module = $("#embedMediaModal");

    if (module.css('display') != "none") {
      module.slideUp("fast");
    } else {
      module.slideDown("fast");
    }
    module.toggleClass("popup-show");
  });

  $("#doEmbedMedia").click(function () {
    var padeditor = require('ep_etherpad-lite/static/js/pad_editor').padeditor;

    $("#embedMediaModal").slideUp("fast");
    $("#embedMediaModal").removeClass("popup-show");

    return padeditor.ace.callWithAce(function (ace) {
      var rep = ace.ace_getRep();
      ace.ace_replaceRange(rep.selStart, rep.selEnd, "E");
      ace.ace_performSelectionChange([rep.selStart[0],rep.selStart[1]-1], rep.selStart, false);
      ace.ace_performDocumentApplyAttributesToRange(rep.selStart, rep.selEnd, [["embedMedia", escape($("#embedMediaSrc")[0].value)]]);
    }, "embedMedia");
  });

  $("#cancelEmbedMedia").click(function () {
    $("#embedMediaModal").slideUp("fast");
    $("#embedMediaModal").removeClass("popup-show");
  });
});
