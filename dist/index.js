var option = {
  el:"#app",
  data:{
    firstName:"Levi",
    lastName:"Lee",
    people:{
      info:{
        name:"levi",
        school:{
        	local:"guangdong",
        	city:"shenzhen"
        }
      }
    },
    man:[
    	{
    		key:"cc",
    	},{
    		key:"aaa",
    	}
    ],
  },
  computed:{
    fullName: function(){
      return this.firstName+" "+this.lastName;
    }
  }
}

var vm = new Lemo(option);