var Connexion = React.createClass({

	getInitialState: function() {
		return {connected:false,toggle:false,msg:"",utilisateur:{}};
	},
	componentDidMount:function(){
		$.ajax({
			url: "/Connexion",
			type: "put",
			dataType: "json",
			success: function(data) {
				if(data.result){
					this.setState({utilisateur:data.result});
					this.setState({connected:true});
					this.setState({toggle:false});
				}
    		}.bind(this),
    	});	
	},
	toggle: function(){
		this.setState({toggle:!this.state.toggle,msg:""});
	},
	connexion:function(e){
		e.preventDefault();
		$.ajax({
			url: "/Connexion",
			type: "post",
			data: {identifiant: $('#identifiant').val(), motdepasse: $('#motdepasse').val()},
			dataType: "json",
			success: function(data) {
				if(data.result){
					console.log("Connexion effective en tant que:");
					console.log(data.result);
					this.setState({utilisateur:data.result});
      				this.setState({connected:true});
      				this.setState({toggle:false});
      				this.setState({msg:''});
				} else{
					this.setState({msg:data.error});
				}
    		}.bind(this),
    	});	
	},
	deconnexion:function(){
		$.ajax({
			url: "/Deconnexion",
			type: "post",
			success: function() {
				console.log("Deconnexion effective");
      			this.setState({connected:false});
    		}.bind(this),
    		error: function(xhr, status, err) {
      			console.log(xhr);
      			console.log(status);
      			console.log(err);
    		}.bind(this)
		});
	},
	render: function() {
		var connexion = <input value="Se Connecter" className="special big" type="button" onClick={this.toggle}/>
		var deconnexion = <input value="Deconnexion" className="special big" type="button" onClick={this.deconnexion}/>
		var form1 = <div className="12u$">
		        		<input className="name" id="identifiant" placeholder="Id" type="text" />
		    		</div>
		var form2 = <div className="12u$">
		        		<input name="password" id="motdepasse" placeholder="Password" type="password" />
		        		{this.state.msg}
		   			</div>
		var submit =<div className="12u$">
						<ul className="actions">
		                	<li><input value="Connexion" className="special small" type="submit"/></li>
		            	</ul>
		            </div>
		var lien = 	<div className="12u$">
						<ul className="actions">
		                	<li><input value="Inscription" className="special small" type="button" onClick={()=>window.location.replace("/Inscription")}/></li>
		            	</ul>

		            </div>		
		var formbool = !this.state.connected && this.state.toggle;
		var lienbool = !this.state.connected && !this.state.toggle;
		var greet = <div className="12u$" > <h3>Connecté en tant que</h3> 
		<Utilisateur {...this.state.utilisateur} /></div>
		return(
			<section id="three" className="wrapper style3 special">
				<div className="container">
          			<header className="major">
            		<h2 >CONNEXION</h2>
          			</header>
        		</div>	
				<div className="container 25%">
					<form onSubmit={this.connexion}>
						<div className="row uniform">
		              		<div className="12u$">
		                		<ul className="actions">
		                  			<li>{this.state.connected?deconnexion:connexion}</li>
		                		</ul>
		              		</div>

		              		{(formbool)?form1:""}
		              		{(formbool)?form2:""}
		              		{(formbool)?submit:""}
		              		{(lienbool)?lien:""}
		            		{this.state.connected?greet:""}

		            	</div>
		            </form>	
		        </div>
		    </section>    
		);
	
			
	}
});

ReactDOM.render(
  <Connexion />,
  document.getElementById('content2')
);


