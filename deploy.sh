#!/bin/bash


gcloud builds submit --tag gcr.io/nodesjs/notesjs-api

gcloud run deploy notesjs-api --image gcr.io/nodesjs/notesjs-api --region europe-west2

