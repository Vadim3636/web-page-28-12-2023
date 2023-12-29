// insert #bg element onto page
document.getElementById("bg-container").appendChild(
    createStarsBackground()
  );
  
  
  
  /**
   * Function to randomly generate a "#bg" element
   * filled with a set number of ".star-group" SVG elements,
   * each of which is filled with a set number of ".star" circle elements.
  */
  function createStarsBackground(
    // Default Presets
    num_star_groups = 8,
    stars_per_group = 75,
  ) {
  
    return createBg();  // init
    
  
    /**
     * Set multiple CSS styles on an element at once.
     * @param element An HTML Element.
     * @param props A dictionary of CSS property names and their corresponding values.
    */
    function setStyle(element, props) {
      for (let property in props) {
        element.style[property] = props[property];
      }
    }
  
  
    /**
     * Generate the CSS Styles used by this background
     * and inject it into the element within a style tag.
    */
    function addStyleTag() {
      let keyframes_style = document.createElement('style');
      keyframes_style.innerHTML = `
        #bg { background: linear-gradient(#000000, #18182e, #000000); }
        #bg .star-group {
          animation-iteration-count: infinite;
          animation-name: twinkle;
          animation-timing-function: linear;
          height: 100%;
          inset: 0;
          width: 100%;
          position: absolute;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 0; }
        }
        @media (prefers-reduced-motion) {
          #bg .star-group { animation-play-state: paused; }
        }
        #bg .star-group .star {
          background: #ffffff;
          border-radius: 50%;
          position: absolute;
        }
      `;
      return keyframes_style;
    }
  
    /**
     * Return the completed "#bg" element, 
     * containing its randomly generated children elements.
    */
    function createBg() {
  
      // create background element
      let bg = document.createElement("div");
  
      // set attributes
      bg.id = "bg";
      bg.appendChild(addStyleTag());
  
      // populate star groups
      for (let i=0; i<num_star_groups-1; i++) {
        bg.appendChild(createStarGroup());   // n-1 animated groups
      }
      bg.appendChild(createStarGroup());  // one static group
  
      return bg;
    }
  
  
    /**
     * Return a randomly generated ".star-group" SVG element,
     * with a randomly set animation duration and initial offset.
    */
    function createStarGroup(
      min_anim_length = 4,  // seconds
      max_anim_length = 8   // seconds
    ) {
      const anim_variance = max_anim_length - min_anim_length;
  
      // create star group
      let star_group = document.createElement("div");
      let anim_duration = min_anim_length + Math.floor(Math.random() * anim_variance);
      let anim_delay = -1 * Math.floor(Math.random() * anim_duration);
  
      // set attributes
      star_group.classList.add("star-group");
      setStyle(star_group, {
        "animation-duration": `${anim_duration}s`,
        "animation-delay": `${anim_delay}s`,
      });
      
      // populate stars
      for (j=0; j<stars_per_group; j++) {
        star_group.appendChild(createStar());
      }
  
      return star_group;
    }
  
  
    /**
     * Return a randomly generated ".star" circle element
     * with a randomly set position and size.
    */
    function createStar(
      min_size = 0.5,  // px
      max_size = 2.5   // px
    ) {
      const size_variance = max_size - min_size;
  
      // create star
      let star = document.createElement("span");
      let x = Math.floor(Math.random() * 1000) / 10;  // 0.0 to 100.0
      let y = Math.floor(Math.random() * 1000) / 10;  // 0.0 to 100.0
      let size = (
        Math.floor(Math.random() * (size_variance * 100)) + (min_size * 100)
      ) / 100;
      
      // set attributes
      star.classList.add("star");
      setStyle(star, {
        "height": `${size}px`,
        "left": `${x}%`,
        "top": `${y}%`,
        "width": `${size}px`,
      });
  
      return star;
    }
  
  }
  