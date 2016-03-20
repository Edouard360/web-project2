var Objet = React.createClass({
  render: function(){
    return(
      <div className="box objet">
      <h6>
      NOM : {this.props.nom}<br/> 
      DESCRIPTION : {this.props.description}</h6>
      {this.props.lieux}
      </div>
      )
  }
});


var Affiche = React.createClass({
  render: function(){
    var supprimer = <button className="button small" onClick={this.handleDelete}> <i className="fa fa-trash-o"></i>&nbsp; Supprimer</button>
    var undeclare = <button className="button small" onClick={this.handleUndeclare}><i className="fa fa-unlock"></i>&nbsp; Retirer</button>
    var declarer = <button className="button small" onClick={this.handleDeclare}><i className="fa fa-tag"></i>&nbsp; Déclarer</button>
    var retrouve =<div>
            Et a été retrouvé par:
            <Utilisateur {...this.props.foundBy} />
            </div>
    return(
      <div className="container affiche">
            L'OBJET
            <Objet {...this.props.objet} />  

            A été perdu par:
            <Utilisateur {...this.props.lostBy} />

            {this.props.foundBy.nom?retrouve:""}
        <div>    
            {this.props.user.idu===this.props.lostBy.idu||this.props.user.admin ? supprimer:""}
            {this.props.foundBy.idu===this.props.user.idu ? undeclare:""}
            {!this.props.foundBy.idu?declarer:""}
        </div> 
      </div>
      );
  },
  handleDelete: function(){
    this.props.handleDelete(this.props.objet.ido);
  },
  handleDeclare: function(){
    this.props.handleDeclare(this.props.objet.ido);
  },
  handleUndeclare: function(){
    this.props.handleUndeclare(this.props.objet.ido);
  },
});


var ListeAffiche = React.createClass({
  getInitialState: function() {
    return {objets: [], lieux: [],user:{}};
  },
  componentDidMount: function() {
   this.loadFromServer();
  },
  loadFromServer: function(){
  // --- TRES IMPORTANT ON REFORMATTE LES DONNEES !! --- //
    $.ajax({
      url: "/ChargerLesObjets",
      type: "get",
      dataType: 'json',
      success: function(data) {
        data=data.map(function(props){
          var newprops={};
          newprops["lieux"]=props.lieux?props.lieux.split(","):"";
          newprops["lostBy"]={idu:props.lostByidu,nom:props.lostBynom,prenom:props.lostByprenom,identifiant:props.lostByidentifiant,admin:props.lostByadmin};
          newprops["foundBy"]={idu:props.foundByidu,nom:props.foundBynom,prenom:props.foundByprenom,identifiant:props.foundByidentifiant,admin:props.foundByadmin};
          newprops["objet"]={ido:props.ido,nom:props.nom, description:props.description};
           //console.log(newprops);
           return newprops;
         });
        this.setState({objets :data});
      }.bind(this)
    });
    $.ajax({
      url: "/ChargerLesLieux",
      type: "get",
      dataType: 'json',
      success: function(data) {
        this.setState({lieux :data});
      }.bind(this)
    });
    $.ajax({
      url: "/Connexion",
      type: "put",
      dataType: "json",
      success: function(data) {
        if(data.result){
          this.setState({user:data.result});
          console.log(data.result);
        }
        }.bind(this),
      }); 
  },
    handleDelete:function(ido){
      $.ajax({
        url: "/SupprimerUnObjet",
        type: "post",
        data: {ido:ido},
        success: function() {
          this.loadFromServer();
        }.bind(this),
        error:function(){
          //console.log(1);
        }
      });
    },
    handleDeclare:function(ido){
      $.ajax({
        url: "/DeclarerAvoirTrouveUnObjet",
        type: "post",
        data:{ido:ido},
        success: function() {
          //console.log("nice");
          this.loadFromServer();
        }.bind(this)
      });
    },
    handleUndeclare:function(ido){
      $.ajax({
        url: "/RetirerDeclaration",
        type: "post",
        data:{ido:ido},
        success: function() {
          //console.log("nice");
          this.loadFromServer();
        }.bind(this)
      });
    },
    filtre:function(props){if(!this.state.entier) return true; else{return(props.objet.ido>parseInt(this.state.entier));}},
    handleChange:function(e){
      this.setState({entier:e});
      //console.log(this.state.entier);
    },
    render: function() {
      var objets = this.state.objets.filter(this.filtre).map(function(props) {
        return (
         <Affiche {...props} user={this.state.user} key={props.objet.ido} handleDelete={this.handleDelete} handleDeclare={this.handleDeclare} handleUndeclare={this.handleUndeclare}> 
            	//après on rajoute le send message.
            	</Affiche>
              );
      }.bind(this));
      return (
        <section id="one" className="wrapper style1 special">
          <header className="major">
            <h2>OBJETS PERDUS</h2>
            <p>Si vous avez perdu quelque chose, faites-le savoir !</p>
          </header>

        
    
        <div className="listeaffiches">
          <div className="container affiche">
            <ObjetForm data={this.state.lieux} />
          </div>
          {objets}
        </div>
        
        
        <Autobar data={this.state.lieux} />
        </section>
        );
    },
});

/*
 ReactDOM.render(
   <Bloc />,
   document.getElementById('content3')
   );


ReactDOM.render(
  <ListeUtilisateur />,
  document.getElementById('content5')
);
*/

ReactDOM.render(
  <ListeAffiche />,
  document.getElementById('content4')
);






