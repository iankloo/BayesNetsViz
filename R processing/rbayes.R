library(RWeka)

data(iris)

BNet <- make_Weka_classifier("weka/classifiers/bayes/BayesNet")
K2="weka.classifiers.bayes.net.search.local.K2"
wcontrol <- Weka_control(D=TRUE,Q=K2,"--")
model <- BNet(Species~., data=iris, control=wcontrol)

model$classifier
model$predictions
model$call
model$handlers
model$terms

summary(model)
str(model)

writeLines(rJava::.jstrVal(model$classifier))

WOW("BayesNet")

predict(model, type="probability")

library(bnlearn)

?tree.bayes

data(learning.test)

data(iris)

iris$Sepal.Length <- discretize(iris$Sepal.Length, method='interval', categories = 3)
iris$Sepal.Width <- discretize(iris$Sepal.Width, method='interval', categories = 3)
iris$Petal.Width <- discretize(iris$Petal.Width, method='interval', categories = 3)
iris$Petal.Length <- discretize(iris$Petal.Length, method='interval', categories = 3)


res <- naive.bayes(iris, "Species", c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width"))

fitted <- bn.fit(res, iris)

names(res[2]$nodes)
nodes <- data.frame(names=(names(res[2]$nodes)))
nodes$id <- 1:nrow(nodes)

links <- as.data.frame(res$arcs)
colnames(links) <- c('source', 'target')

links <- merge(links, nodes, by.x='source', by.y='names')
links <- merge(links, nodes, by.x='target', by.y='names')
links <- links[,c(3,4)]
colnames(links) <- c('source', 'target')
links <- links-1

x <- list(nodes=nodes, links=links)

library(jsonlite)
graph <- toJSON(x)

write(graph, "iris.json")




graph <- c(graphJSON, graphJSON2)



write(graphJSON, "iris.json")




test <- compile(as.grain(fitted))

library(RJSONIO)

file <- toJSON(fitted)
write(file, "iris.json")


bn = naive.bayes(learning.test, "A")
pred = predict(bn, learning.test)
table(pred, learning.test[,"A"])

data(learning.test)
# learn the network structure.
res = gs(learning.test)
# set the direction of the only undirected arc, A - B.
res = set.arc(res, "A", "B")
# estimate the parameters of the Bayesian network.
fitted = bn.fit(res, learning.test)
# replace the parameters of the node B.
new.cpt = matrix(c(0.1, 0.2, 0.3, 0.2, 0.5, 0.6, 0.7, 0.3, 0.1),
                 byrow = TRUE, ncol = 3,
                 dimnames = list(B = c("a", "b", "c"), A = c("a", "b", "c")))
fitted$B = as.table(new.cpt)
?gs



tree.bayes(iris, 'Species', c('Sepal.Length'))
