---
sidebar_position: 2
---

# Appchain configuration

This page explains the configuration options for your Madara appchain.

## Overview

An Appchain consists of multiple configurable components. While the default configuration is suitable for quick testing, adjustments are needed to optimize performance and customize the Appchain for its intended purpose.

## Changing configuration values

Madara Appchain, when started with the CLI, can be started with a configuration file.

### Generating a configuration file

A configuration file can be generated with the CLI by executing:
```bash
cargo run init --default
```

The file will be called `my_custom_config.toml` and can be found in folder `deps/data`. 

You are free to modify any of the values before starting the Appchain with the configuration file. This page will help you adjust the values.

### Running Madara with the configuration file

Once you have modified the values you need, you can start Madara with the configuration file:
```bash
cargo run create --config-file deps/data/my_custom_config.toml
```

For more information on how to start your Appchain, please refer to [this guide](/quickstart/run_appchain)

## Performance

Different Appchains have different performance requirements.

