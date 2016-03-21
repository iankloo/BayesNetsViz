# BayesNetsViz

The goal of this project is to create an intereactive visualization from learned Bayes Nets.  The end result will likely mirror the Bayes Net editor in Weka, but will be not be exclusive to Weka and will be more visually appealing.

The first implementation will leverage machine learning packages in R (weka, bnlearn, etc.) to learn bayes nets - both structure and conditional probability tables.  Then, the results will be plotted using the D3 javascript library.  I am hoping to add interactivity through D3/jquery.  Ultimately, the D3 output will be directly linked to R using an html widget.

Further development might try to completely remove R from the process, but it seems like a good idea to leverage the ongoing machine learning development in R, as well as the realtive ease to connect R to javascript/D3 through html widgets.

