# Recipe Nutrition Analysis Using Wolfram and AI

![recipe nutrition analysis cover](images/cover.jpg)

In this tutorial, you will learn how to analyze recipe nutrition using Wolfram Cloud and OpenAI on the Node.js platform. The recipe and the report analysis will be saved to the GridDB database.

## Table of Contents

1. [Introduction](#introduction)
2. [Running the Project](#running-the-project)
3. [Getting Started](#getting-started)
    1. [Setting Up Wolfram Cloud Account](#setting-up-wolfram-cloud-account)
    2. [Installing Node.js](#installing-nodejs)
    3. [Setting Up GridDB](#setting-up-griddb)
    4. [Configuring OpenAI](#configuring-openai)
4. [Project Structure](#project-structure)
5. [Implementation](#implementation)
    1. [Connecting to Wolfram Cloud](#connecting-to-wolfram-cloud)
    2. [Retrieving Recipe Data](#retrieving-recipe-data)
    3. [Analyzing Nutrition Data](#analyzing-nutrition-data)
    4. [Storing Data in GridDB](#storing-data-in-griddb)
6. [Conclusion](#conclusion)

## Introduction

This tutorial will walk you through building a nutrition analysis tool for recipes using Wolfram Cloud and OpenAI. We will use Node.js for the backend and store the resulting data in GridDB.

## Running the Project

Clone the project from this [GitHub](https://github.com/junwatu/recipe-nutritional-analysis.git) repository.

```shell
git clone https://github.com/junwatu/recipe-nutritional-analysis.git
```

Change the directory to the project root and go to the `app` folder then install all the dependencies:

```shell
cd recipe-nutritional-analysis
cd app
npm install
```

Create the `.env` file and copy environment variables from the `.env.example`. You need an [OpenAI API](#configuring-openai) key for this project, please go here for explanation.

## Getting Started

To build this project, you need the following steps:

### 1. Setting Up Wolfram Cloud Account

[Sign up](https://www.wolframcloud.com) for the Wolfram Cloud account. You will need Wolfram to calculate recipe nutrition using the [NutritionReport](https://resources.wolframcloud.com/FunctionRepository/resources/NutritionReport) function.

### 2. Installing Node.js

1. Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. Verify the installation by running `node -v` and `npm -v` in your terminal.

### 3. Setting Up GridDB

1. Download and install GridDB from [griddb.net](https://griddb.net/).
2. Follow the installation instructions to set up GridDB on your system.

### 4. Configuring OpenAI

1. Sign up for an OpenAI account.
2. Obtain your API key from the OpenAI dashboard.

## Project Structure

Outline the directory and file structure for the project:

```shell
recipe-nutrition-analysis/
├── images/
│   └── cover.jpg
├── src/
│   ├── index.js
│   ├── wolframClient.js
│   ├── openaiClient.js
│   ├── gridDBClient.js
│   └── utils.js
├── .env
├── package.json
└── README.md
```

## Implementation

### Connecting to Wolfram Cloud

Explain how to establish a connection to Wolfram Cloud using the API key.

### Retrieving Recipe Data

Provide instructions and code snippets to fetch recipe data.

### Analyzing Nutrition Data

Show how to use Wolfram and OpenAI to analyze the nutrition data from the recipe.

Create a function to calculate recipe nutrition using Wolfram Language in the Wolfram Cloud editor.

```wolfram
api = APIFunction[
  {"ingredients" -> "String"},
  ResourceFunction["NutritionReport"][#ingredients, "ASCIITable"] &]
```

### Storing Data in GridDB

Detail the steps and code to save the analyzed data into GridDB.

## Conclusion

Summarize the tutorial and discuss potential improvements or next steps for the project.

---

This structure ensures that each critical aspect of the tutorial is covered in a logical and easy-to-follow manner.
