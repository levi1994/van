export default function(Van) {
  // Image
  Van.Image = Van.component({
    data: {
      src: '',
      width: 500,
      height: 500
    },
    off: true,
    background: true,
    render: function() {
      let self = this;
      let img = new Image();
      img.onload = function() {
        self.$ctx.drawImage(img, 0, 0);
      };
      img.src = self.src;
    }
  });
}
