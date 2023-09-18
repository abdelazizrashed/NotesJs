#!/bin/bash


gcloud builds submit --tag gcr.io/nodesjs/notesjs-api

gcloud run deploy myshowslist --image gcr.io/myshowslist-e48f4/myshowslist --region europe-west2

