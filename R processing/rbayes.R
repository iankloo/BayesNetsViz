require(RWeka)
require(bnlearn)
require(rCharts)

setwd("~/Projects/BayesNetsViz/R processing")


data(iris)

iris <- data.frame(iris)

#make descrete categories
iris[,c(1:4)] <- discretize(iris[,c(1:4)], method='interval')

#learn network/cpt
res <- naive.bayes(iris, "Species", c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width"))
#create fitted object
fitted <- bn.fit(res, iris)

#create graph object(learns x, y coords using igraph)
graphObj <- graphviz.plot(fitted)

#extract x, y coords
yCoord <- graphObj@renderInfo@nodes$nodeY
xCoord <- graphObj@renderInfo@nodes$nodeX

#make new list of each object with x, y coords added
newlist <- list()
for (i in 1:length(fitted)) {
  temp <- c(fitted[[i]], x=as.numeric(xCoord[names(xCoord) == names(fitted[i])]), y = as.numeric(yCoord[names(yCoord) == names(fitted[i])]))
  newlist[[length(newlist)+1]] <- temp
}

#convert to json
jsonOut <- toJSONArray(newlist)

write(jsonOut, 'iris.json')

toJSONArray(links)

####json description:
##array of objects (nodes) with attributes:
#node = name
#parents = list of parents
#children = list of children
#prob = CPTs
#x = x coordinate
#y = y coordinate

###Now can avoid learning graph structure in D3 (force networks were slow) and can focus
###on speed and interactivity.  




