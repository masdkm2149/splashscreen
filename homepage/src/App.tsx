import './App.css'
import $ from "jquery";
import { getRandomAAColor, getContrast } from 'accessible-colors';
import convert from 'color-convert';

function App() {    


  function setup() {
    // r1 = Hue (1 to 360)
    let r1Min = 1, r1Max = 360;
    var rr1 = parseFloat((Math.random() * (r1Max - r1Min) + r1Min).toFixed(1)); // Generates random hue
    document.querySelector('body')?.style.setProperty('--bg_hue', rr1 + '');

    // r2 = Saturation (0 to 100)
    let r2Min = 5, r2Max = 100;
    var rr2 = parseFloat((Math.random() * (r2Max - r2Min + 1) + r2Min).toFixed(1)); // Generates random saturation
    document.querySelector('body')?.style.setProperty('--bg_saturation', rr2 + '%');
  
    // r3 = Luminosity (Default: 0 to 100)
    let r3Min = 2, r3Max = 98;
    var rr3 = parseFloat((Math.random() * (r3Max - r3Min + 1) + r3Min).toFixed(1)); // Generates random luminosity
    document.querySelector('body')?.style.setProperty('--bg_brightness', rr3 + '%');

/*
  Removed, updated code below
    //Set random text color that passes AA contrast 
    document.querySelector('body')?.style.setProperty('--AA-txt-hexadecimal-color', getRandomAAColor((convert.hsl.hex(rr1, rr2, rr3)), true));
*/
    function setAcceptableTextColor() {    
      // Get random text color that passes background for AA contrast 
      let acceptablecolor = getRandomAAColor(convert.hsl.hex([rr1, rr2, rr3]), true);
      let hslValues = convert.hex.hsl(acceptablecolor!); // convert hex to hsl

      // Loop until a valid color is found
      while (!(hslValues[0] > rr1 * 0.6 || hslValues[0] < rr1 * 0.4)) {
          // Generate a new color and its HSL values only if the condition is not met
          acceptablecolor = getRandomAAColor(convert.hsl.hex([rr1, rr2, rr3]), true);
          hslValues = convert.hex.hsl(acceptablecolor!);
      }
  
      // Set the acceptable color as a CSS custom property (variable) once
      document.querySelector('body')?.style.setProperty('--AA-txt-hexadecimal-color', acceptablecolor);
  }
  
  //Function to apply text color
  setAcceptableTextColor();
  

    // Meta tag updates
    $('meta[name=theme-color]').remove();
    $('head').append("<meta name='theme-color' content='hsl(" + rr1 + "," + rr2 + "," + rr3 +")'>");
    $('meta[name=apple-mobile-web-app-status-bar-style]').remove();
    $('head').append("<meta name='apple-mobile-web-app-status-bar-style' content='hsl(" + rr1 + "," + rr2 + "," + rr3 +")'>");

    //var ww_val = document.querySelector(':root').style.getPropertyValue('--ww');
    //var wh_val = document.querySelector(':root').style.getPropertyValue('--wh');
    
    // Generative Favicon
      var icon_bg_hue = document.querySelector('body')?.style.getPropertyValue('--bg_hue');
      var icon_bg_luma = document.querySelector('body')?.style.getPropertyValue('--bg_brightness');
      var icon_bg_sat = document.querySelector('body')?.style.getPropertyValue('--bg_saturation');
      var icon_fg_hex = document.querySelector('body')?.style.getPropertyValue('--AA-txt-hexadecimal-color');
      //$('head').append("<link rel=\"icon\" type=\"image/svg+xml\" href=\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Crect x='10' y='10' width='160' height='160' style='fill:hsl("+ icon_bg_hue + "," + icon_bg_sat + "," + icon_bg_luma + ");'%3E%3C/rect%3E%3Ccircle cx='90' cy='90' r='45' style='fill:hex("+ icon_fg_hex + ");mix-blend-mode: difference;'%3E%3C/circle%3E%3C/svg%3E\" />");
      var icon_href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Crect x='10' y='10' width='160' height='160' style='transition: all.5s ease-out; fill:hsl("+ icon_bg_hue + "," + icon_bg_sat + "," + icon_bg_luma + ");'%3E%3C/rect%3E%3Ccircle cx='90' cy='90' r='45' style='fill:hex("+ icon_fg_hex + ");transition: all .4s ease-out;mix-blend-mode: difference;'%3E%3C/circle%3E%3C/svg%3E"

     if ( $("link[rel='icon']").length ) { $("link[rel='icon']").attr("href", icon_href); } else { $('head').append("<link rel=\"icon\" type=\"image/svg+xml\" href=\""+icon_href+"\" />"); }
  }
  setup();


function addTrans() {(document.querySelector(':root') as HTMLElement)?.style.setProperty('transition', 'ease-out background-color .5s'); document.body.style.setProperty('transition', 'ease-out background-color .5s'); }                     
setTimeout(addTrans, 500); 
  (document.querySelector(':root') as HTMLElement)?.style.setProperty('--ww', ""+innerWidth);
  (document.querySelector(':root') as HTMLElement)?.style.setProperty('--wh', ""+innerHeight);  
  // set rotational classes
  var t = ["i1", "i2", "i3", "i4", "i5", "i6", "i7"];
  // start from 0 (Default)
  var counter = 1;      

  setTimeout(() => { 
    document.querySelector('h1.txt')?.classList.add('fade');
  }, 1000); 
  setTimeout(() => { 
    document.querySelector('h1.txt')?.classList.remove('fade');
  }, 4500);  // to start with tagline (must adjust 'var counter = 1')
  // set rotation timing
  setInterval(change, 5000);
  // start text rotation 
  function change() { 
    // add classes
    document.querySelector('h1.txt')?.classList.add(t[counter]);
    // adjust fade timing, must also adjust changes in stylesheet transitions
    setTimeout(() => { document.querySelector('h1.txt')?.classList.add('fade');

    }, 500);
    setTimeout(() => { document.querySelector('h1.txt')?.classList.remove('fade');

    }, 4500);
    // clear previous text class
    if (counter > 0 && counter < 7) { document.querySelector('h1.txt')?.classList.remove(t[counter - 1]); }
    if (counter < 1 && document.querySelector('h1.txt')?.classList.contains('i7')) { document.querySelector('h1.txt')?.classList.remove(t[6]); }
    if (counter >= 1 && document.querySelector('h1.txt')?.classList.contains('i1')) { document.querySelector('h1.txt')?.classList.remove(t[0]); }
    counter++;
    if (counter >= t.length) {
      counter = 0;
      // clearInterval(change); // uncomment this if you want to stop refreshing after one cycle
    }  
  }

  return (
    <>
    <h1 className="txt i1">
      Daniel Roswadowsky
      </h1></>
  )
}

export default App
