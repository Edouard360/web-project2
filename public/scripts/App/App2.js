var App2 = React.createClass({
  getInitialState: function () {
    return {
      Home:"",
      Lieux:"",
      Connexion:"",
      Docs:"",
      Users:"",
      user:{}
    }
  },
  componentWillMount:function(){
    this.loadFromServer();
  },
  loadFromServer:function(){
    $.ajax({
      url: "/Connexion",
      type: "put",
      dataType: "json",
      success: function(data) {
        if(data.result){
          this.setState({user:data.result}); 
        }
        this.switch(this.props.active); 
        }.bind(this),
      }); 
  },
  switch:function(active){
    switch(active) {
    case "Home":
        this.setState({Home:"active",Lieux:"",Connexion:"",Docs:"",Users:""});
        ReactDOM.render( <ListeAffiche user={this.state.user} />, document.getElementById('content2') );
        break;
    case "Lieux":
        this.setState({Home:"",Lieux:"active",Connexion:"",Docs:"",Users:""});
        ReactDOM.render( <ListeLieu user={this.state.user} />, document.getElementById('content2') );
        break;
    case "Connexion":
        this.setState({Home:"",Lieux:"",Connexion:"active",Docs:"",Users:""});
        console.log(this.state.user);
        ReactDOM.render( <Connexion user={this.state.user} connect={this.connect} />, document.getElementById('content2') );
        break;     
    case "Docs":
        this.setState({Home:"",Lieux:"",Connexion:"",Docs:"active",Users:""});
        break;  
    case "Users":
        this.setState({Home:"",Lieux:"",Connexion:"",Docs:"",Users:"active"});
        
        break;        
    default:
    }    
  },
  connect:function(user){
    this.setState({user:user});
    this.switch("Home");
    //Problème, on change d'état puis on affiche ?
  },
  avoidReload:function(event){
    console.log(event.target.id);
    this.switch(event.target.id);
  },
  render:function(){
    return(
      <div>
        <nav className="navbar navbar-default navbar-fixed-top ">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#"><i className="fa fa-ticket"></i>&nbsp; Objet Perdu</a>
            </div>  
            <ul className="nav navbar-nav">
              <li role="presentation" onClick={this.avoidReload} className={this.state.Home}><a href="#" id="Home"  ><i className="fa fa-key" id="Home" ></i>&nbsp;</a></li>
              <li role="presentation" onClick={this.avoidReload} className={this.state.Lieux}><a href="#" id="Lieux" ><i className="fa fa-university" id="Lieux"></i>&nbsp;</a></li>
              <li role="presentation" onClick={this.avoidReload} className={this.state.Users}><a href="#" id="Users" ><i className="fa fa-users" id="Users"></i>&nbsp;</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li role="presentation" onClick={this.avoidReload} className={this.state.Docs} ><a href="#" id="Docs"><i className="fa fa-book" id="Docs"></i>&nbsp; </a></li>
              <li role="presentation" onClick={this.avoidReload} className={this.state.Connexion} ><a href="#" id="Connexion"><i className="fa fa-refresh" id="Connexion"></i>&nbsp;</a></li>
            </ul>
          </div>
        </nav>
      </div>
      )
  },
});

$.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyCL0D13h3FIvrnrRFRvuC4rj_GY8eOl9eQ").done(creater);
function creater(){
ReactDOM.render(
  <App2 active="Home"/>,
  document.getElementById('content1')
);
}
