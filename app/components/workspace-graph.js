import Ember from 'ember';

export default Ember.Component.extend({
  graph: function() {
      var graph = new joint.dia.Graph;
      var width = 1200;
      var height = 640;
      var paper = new joint.dia.Paper({
          el: $('#workspace'),
          width: width, height: height, gridSize: 10,
          model: graph,
          defaultLink: new joint.dia.Link({
              attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
          }),
          validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
              // Prevent loop linking
              return (magnetS !== magnetT);
          },
          // Enable link snapping within 75px lookup radius
          snapLinks: { radius: 75 }
      });

      var m1 = new joint.shapes.devs.Model({
          position: { x: 50, y: 50 },
          size: { width: 90, height: 90 },
          inPorts: ['in1','in2'],
          outPorts: ['out'],
          attrs: {
              '.label': { text: 'Model', 'ref-x': .4, 'ref-y': .2 },
              rect: { fill: '#2ECC71' },
              '.inPorts circle': { fill: '#16A085', magnet: 'passive', type: 'input' },
              '.outPorts circle': { fill: '#E74C3C', type: 'output' }
          }
      });

      var clones = [];
      clones[0] = m1;
      for(var i = 1; i < 100; i++) {
        clones[i] = m1.clone().translate(10*i, 0);
      }

      graph.addCells(clones);

      // for(i=2; i < 1000; i++) {
      //   var m2 = m1.clone();
      //   m2.translate(300, 0);
      //   graph.addCell(m2);
      //   m2.attr('.label/text', 'Model ' + i);
      // }
  }.on('didInsertElement')
});
