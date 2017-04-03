// registe gloval api
export default function(Van) {
  Van.component = function(options) {
    var van = new Van(options);
    return van;
  };
}
