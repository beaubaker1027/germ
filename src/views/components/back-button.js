function BackButton(link){
  return (new Reef('.back-button', {
    template: function(props){
      return(
        `
        <a href=${link} target="_self">
          <div></div>
        </a>
        `
      );
    }
  }));
}

export default BackButton;