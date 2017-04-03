// registe gloval api
export default function(Van) {

  // generate a component
  Van.component = function(options) {
    var van = new Van(options);
    return van;
  };


}
