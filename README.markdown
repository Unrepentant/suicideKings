**Features** ([demo][1])

* Parse SuicideKings.lua file created by the World of Warcraft Suicide Kings addon version 3.1
 (http://wow.curse.com/downloads/wow-addons/details/suicide-kings.aspx) using javascript/jQuery only.
* Display a table with Rank, Weapon/Trinket, Accessories, Armor & Tier columns with character names listed in rank order.
* Choose from either a dark or light stylesheet, or make your own.

**Usage & Options (defaults)**

Script:

    $('#sKings').suicideKings({
     skFile      : "SuicideKings.lua", // Name & location of the SuicideKings.lua file
     ranksToShow : 60,                 // Number of ranks to show in the table
     fixClass    : []                  // Replace "Unknown" with class: fix['Toon Name'] = 'Class';
                                       // 'Toon Name' should include all capitals and spaces, exactly like you see it in the table
                                       // 'Class' should be a predefined wow class (captial letters don't matter)
    });

HTML:

    <div id="sKings">
     <table class="list">
      <thead>
       <tr class="title">
        <th class="rank">Rank</th>
        <th>Weapon/Trinket</th>
        <th>Accessories</th>
        <th>Armor</th>
        <th>Tier</th>
       </tr>
      </thead>
      <tbody>
      </tbody>
     </table>
    </div>

**Changelog**

Version 1.0 (8/25/2010)

* Suicide Kings script posted on github.

 [1]: http://mottie.github.com/suicideKings/