import Ember from 'ember';

export default Ember.Component.extend({
  makeNode() {
    return new joint.shapes.devs.Model({
      position: {
        x: 50,
        y: 50
      },
      size: {
        width: 90,
        height: 90
      },
      inPorts: ['inputs'],
      outPorts: ['outputs'],
      attrs: {
        '.label': {
          text: 'Model',
          'ref-x': .4,
          'ref-y': .2
        },
        rect: {
          fill: '#2ECC71'
        },
        '.inPorts circle': {
          fill: '#16A085',
          magnet: 'passive',
          type: 'input'
        },
        '.outPorts circle': {
          fill: '#E74C3C',
          type: 'output'
        }
      }
    });
  },

  actions: {
    addNodes(n) {
      var m1 = this.makeNode();

      var clones = [];
      clones[0] = m1;
      for (var i = 0; i < n; i++) {
        clones[i] = m1.clone().translate(Math.random() * this.width, Math.random() * this.height);
      }

      this.get('graph').addCells(clones);

      this.paper.fitToContent();
    }
  },

  graph: new joint.dia.Graph,

  width: 1200,
  height: 2400,

  setup: function() {
    var graph = this.get('graph');
    var width = this.get('width');
    var height = this.get('height');
    this.paper = new joint.dia.Paper({
      el: $('#workspace'),
      width: width,
      height: height,
      gridSize: 10,
      model: graph,
      perpendicularLinks: true,
      linkPinning: false,
      markVailable: true,
      asyc: true,
      interactive: function(cell, action) {
        if (cell.model instanceof joint.dia.Element) {
          if(action == "pointermove") {
            return false;
          }
        }

        return true;
      },
      defaultLink: new joint.dia.Link({
        attrs: {
          '.marker-target': {
            d: 'M 10 0 L 0 5 L 10 10 z'
          }
        }
      }),
      validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
        // Prevent loop linking
        // debugger;
        return (magnetS !== magnetT) && (magnetT.getAttribute('type') != 'output');
      },
      // Enable link snapping within 75px lookup radius
      snapLinks: {
        radius: 75
      }
    });

    var m1 = this.makeNode();

    var clones = [];
    clones[0] = m1;
    for (var i = 1; i < 10; i++) {
      clones[i] = m1.clone().translate(Math.random() * width, Math.random() * height);
    }

    graph.addCells(clones);

    this.paper.fitToContent();

    // for(i=2; i < 1000; i++) {
    //   var m2 = m1.clone();
    //   m2.translate(300, 0);
    //   graph.addCell(m2);
    //   m2.attr('.label/text', 'Model ' + i);
    // }
  }.on('didInsertElement')
});
