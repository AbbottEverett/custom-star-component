document.addEventListener('DOMContentLoaded', ()=>{
  debugger;
  let stars = {
    // State
    id: 0,
    active: 0,
    total: 5,
    // Methods
    newStar: () => {
      return document.createElement('i');
    },
    toggleStar: (star, starCount) => {
      if (starCount < stars.active) {
        star.classList.add('fa', 'fa-lg', 'fa-star');
      } else {
        star.classList.add('fa', 'fa-lg', 'fa-star-o');
      }
    },
    appendStar: (component, star) => {
      return component.append(star);
    },
    deleteStars: (component) => {
      while (component.hasChildNodes()) {
        component.removeChild(component.lastChild);
      }
    },
    renderStars: (stars, component, starCount = 0) => {
      let newStar = stars.newStar();
      stars.toggleStar(newStar, starCount);
      stars.appendStar(component, newStar);
      if (starCount < stars.total-1) {
        stars.renderStars(stars, component, starCount+1);
      }
    },
    createStarComponent: () => {
      let starContainer = document.createElement('div');
      starContainer.id = 'star-component' + (stars.id+1);
      document.body.append(starContainer);
      let starComponent = document.getElementById('star-component' + (stars.id+1));
      stars.renderStars(stars, starComponent);
      starComponent.addEventListener('click', (event)=> {
        for (let i = 0; i < starComponent.children.length; i++) {
          if (starComponent.children[i] === event.target) {
            stars.active = i+1;
            break;
          }
        }
        stars.deleteStars(starComponent);
        stars.renderStars(stars, starComponent);
      });
    }
  };

  stars.createStarComponent();
});
