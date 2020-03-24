var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var port = 3006;

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/generate_graf', function(req, res){
    let graf = 'digraph fsa {' +
        '}';

    res.render('generate_graf.html', {graf: graf});
});

app.get('/generate_node', function(req, res){
    let graf = 'digraph fsa {' +
        '}';

    res.render('generate_node.html', {graf: graf, result:[]});
});

app.get('/kruskal', function(req, res){
      

var _ = require('underscore');

var nodes = ["A", "B", "C", "D", "E", "F", "G"];
var edges = [
    ["A", "B", 7], ["A", "D", 5],
    ["B", "C", 8], ["B", "D", 9], ["B", "E", 7],
    ["C", "E", 5],
    ["D", "E", 15], ["D", "F", 6],
    ["E", "F", 8], ["E", "G", 9],
    ["F", "G", 11]
];

let kruskal = (nodes, edges) => {
    var mst = [];
    var forest = _.map(nodes, function(node) { return [node]; });
    var sortedEdges = _.sortBy(edges, function(edge) { return -edge[2]; });
    while(forest.length > 1) {
        var edge = sortedEdges.pop();
        var n1 = edge[0],
            n2 = edge[1];

        var t1 = _.filter(forest, function(tree) {
            return _.include(tree, n1);
        });
            
        var t2 = _.filter(forest, function(tree) {
            return _.include(tree, n2);
        });

        if (t1 != t2) {
            forest = _.without(forest, t1[0], t2[0]);
            forest.push(_.union(t1[0], t2[0]));
            mst.push(edge);
        }
    }
    return mst;
}

console.log(kruskal(nodes, edges))

      result = '';
  

    res.render('kruskal.html', {result: result});
});

app.post('/generate_graf', function(req, res){
    console.log(req.body)
    data = req.body;

    let state       = []; /* ["X", "Y", "Z"]
    /* let alpha       = ["a"]; */
    let start       = data.start;
    let finish      = data.finish;
    let graf_func   = [];
    let graf        = '';
    let gfunc       = [];


    data.node.trim().split(",").forEach(row => {
        state.push(row);
    });

    let list_function = data.func.trim().split(";");

    let i = 1;
    list_function.forEach(row => { /* (X, 1)=Y */
            let from,to,label = '';
            
            data = row.trim().replace("(", "").replace(")", "").split("="); /* trim: (X,1)=Y | replace: X,1=Y, split: [index 0] X,1 [index 1] Y */

            console.log(data)

            to = data[1]; /* Y */
            from = data[0].split(",")[0]; /* X */
            label = data[0].split(",")[1]; /* 1 */

            console.log({"from": from, "to": to, "label": label})

            if(i < list_function.length) { /* Jangan ambil index terakhir */
                graf_func.push({"from": from, "to": to, "label": label}); 
            }
            i++;
        });

        
    /*graf_func   = [
        {from: "X", to: "Y", label: "a"}
    ];*/

    graf_func.forEach(row => {
        gfunc.push(row.from + ' -> '+ row.to +' [ label = "' + row.label + '"];');
    });

    console.log(gfunc)

    graf = 'digraph fsa {' +
            'rankdir=LR;' +
            finish + ' [shape = doublecircle];' +
            'node [shape = point ]; qi;' +
            'node [shape = circle];' +
            'qi -> ' + start + ';' +
            gfunc.join(" ") +
        '}';

    console.log(graf);
    
    
     res.render('generate_graf.html', {graf: graf});
});


app.post('/generate_node', function(req, res){
    console.log(req.body)
    data = req.body;

    let state       = [];
    /* let alpha       = ["a"]; */
    let start       = data.start;
    let finish      = data.finish;
    let jumlah_node = 7;
    let graf_func   = [];
    let graf        = '';
    let gfunc       = [];

    var _ = require('underscore');

    let between = (min, max) => {  
        return Math.floor(
          Math.random() * (max - min) + min
        )
      };

var list_node = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var nodes = ["A", "B", "C", "D", "E", "F", "G"];
var edges = [
    ["A", "B", between(1, 50)], ["A", "D", between(1, 50)],
    ["B", "C", between(1, 50)], ["B", "D", between(1, 50)], ["B", "E", between(1, 50)],
    ["C", "E", between(1, 50)],
    ["D", "E", between(1, 50)], ["D", "F", between(1, 50)],
    ["E", "F", between(1, 50)], ["E", "G", between(1, 50)],
    ["F", "G", between(1, 50)]
];

let list_function = [];

edges.forEach(row => {
    graf_func.push({"from": row[0], "to": row[1], "label": row[2]}); 
});

console.log(graf_func);

//.forEach(row => {
//    state.push(row);
//});
var nodes = [];
for (let i = 0; i < jumlah_node; i++)
{
    state.push(list_node[i]);
    nodes.push(list_node[i]);
}

console.log(state);



let kruskal = (nodes, edges) => {
    var mst = [];
    var forest = _.map(nodes, function(node) { return [node]; });
    var sortedEdges = _.sortBy(edges, function(edge) { return -edge[2]; });
    while(forest.length > 1) {
        var edge = sortedEdges.pop();
        var n1 = edge[0],
            n2 = edge[1];

        var t1 = _.filter(forest, function(tree) {
            return _.include(tree, n1);
        });
            
        var t2 = _.filter(forest, function(tree) {
            return _.include(tree, n2);
        });

        if (t1 != t2) {
            forest = _.without(forest, t1[0], t2[0]);
            forest.push(_.union(t1[0], t2[0]));
            mst.push(edge);
        }
    }
    return mst;
}

console.log(kruskal(nodes, edges))

result = kruskal(nodes, edges);

    let i = 1;
    list_function.forEach(row => { /* (X, 1)=Y */
            let from,to,label = '';
            
            data = row.trim().replace("(", "").replace(")", "").split("="); /* trim: (X,1)=Y | replace: X,1=Y, split: [index 0] X,1 [index 1] Y */

            console.log(data)

            to = data[1]; /* Y */
            from = data[0].split(",")[0]; /* X */
            label = data[0].split(",")[1]; /* 1 */

            console.log({"from": from, "to": to, "label": label})

            if(i < list_function.length) { /* Jangan ambil index terakhir */
                graf_func.push({"from": from, "to": to, "label": label}); 
            }
            i++;
        });

        
    /*graf_func   = [
        {from: "X", to: "Y", label: "a"}
    ];*/

    graf_func.forEach(row => {
        gfunc.push(row.from + ' -> '+ row.to +' [ label = "' + row.label + '"];');
    });

    console.log(gfunc)

    graf = 'digraph fsa {' +
            'rankdir=LR;' +
            finish + ' [shape = doublecircle];' +
            'node [shape = point ]; qi;' +
            'node [shape = circle];' +
            'qi -> ' + start + ';' +
            gfunc.join(" ") +
        '}';

    console.log(graf);
    
    
     res.render('generate_node.html', {graf: graf, result: result});
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))