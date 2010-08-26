/* skings - Script to parse data from the SuicideKings.lua from the 
 * World of Warcraft SuicideKings addon version 3.1
 * http://wow.curse.com/downloads/wow-addons/details/suicide-kings.aspx
 *  
 * Author: Rob G, aka Mottie (mottie.guildportal.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * v1.0 8/26/2010 Original version, posted to github
 */

(function($){

  $.fn.suicideKings = function(options) {
   // build main options before element iteration
   var opts = $.extend({}, $.fn.suicideKings.defaults, options);
   // iterate and reformat each matched element
   return this.each(function() {
    var $this = $(this);
    // build element specific options
    var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

    $.ajax({
     url: o.skFile,
     success: function(data){
      /* Reformat LUA to JSON */
      var d = data
       .replace(/\[(.*)\]\s\=\s/g,'$1:')  // change equal to colon & remove outer brackets
       .replace(/[\t\r\n]/g,'')           // remove tabs & returns
       .replace(/[\[\]]/g,'')             // remove brackets
       .replace(/\"\"\:\{\}\,/,'')        // remove initial empty definition
       .replace(/--\s\d+/g,'')            // remove comments
       .replace(/,\s\},\"/g,'],"')        // fix end of group
       .replace(/\{\{/g,'[{')             // replace double open brackets with square
       .replace(/,\}/g,'}')               // remove trailing commas
       .replace(/\}\}/g,'}]')             // replace double closing brackets with square
       .replace(/,\s\}\]/g,']}')          // Fix last line
       .replace(/Weapons\/Trinkets/,'wt') // rename Weapons/Trinkets because of the slash
       .replace(/Tier\sList/,'Tier')      // remove space
       .replace(/(\s\"|\"\s)/g,'"')       // trim spaces around quotes
       .replace(/class/g,'wowclass')      // change "class" to "wowclass" due to reserved name error
       .replace(/SavedRollLists\s\=/,''); // remove variable definition

     // remove the options and sync key from the end
      d = d.substring(0, d.lastIndexOf('SuicideKingsOptions'));
      if (d.lastIndexOf('SuicideKingsSyncKey')) { d.substring(0, d.lastIndexOf('SuicideKingsSyncKey')); }

      var base = $.parseJSON(d),
      getInfo = function(g){
       if (typeof(g) == "undefined") { return ["&nbsp;",""]; }
       return [ g.player, (typeof(g.wowclass) == "undefined") ? o.fixClass[g.player] || "unknown" : g.wowclass ];
      };

      // Build Table
      var t = '', n, i;
      for ( i=0; i<o.ranksToShow; i++ ){
       t += '<tr><td class="rank">' + (i+1) + '</td>';

       n = getInfo(base.wt[i]);
       t += '<td class="wt ' + n[1].toLowerCase() + '">' + n[0] + '</td>';

       n = getInfo(base.Accessories[i]);
       t += '<td class="ac ' + n[1].toLowerCase() + '">' + n[0] + '</td>';

       n = getInfo(base.Armor[i]);
       t += '<td class="ar ' + n[1].toLowerCase() + '">' + n[0] + '</td>';

       n = getInfo(base.Tier[i]);
       t += '<td class="tl ' + n[1].toLowerCase() + '">' + n[0] + '</td>';
      }
      $this.find('tbody').append(t);
     },
      error: function(){
       $this.html('<div align="center">No Data Found!</div>');
     }
    });
   });
  };

  $.fn.suicideKings.defaults = {
   skFile      : "SuicideKings.lua", // Name & location of the SuicideKings.lua file
   ranksToShow : 60,                 // Number of ranks to show in the table
   fixClass    : []                  // Replace "Unknown" with class: fix['Toon Name'] = 'Class';
                                     // 'Toon Name' should include all capitals and spaces, exactly like you see it in the table
                                     // 'Class' should be a predefined wow class (captial letters don't matter)
  };

})(jQuery);