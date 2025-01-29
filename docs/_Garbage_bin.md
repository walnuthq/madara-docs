# Garbage bin

This page is only for temporary storage for draft docs.

## Install Madara with cargo or docker


There are two ways to install Madara:
1. Build from source
1. With Docker

Please choose the one that fits you best.

### Option 1: Build from source

First, make sure you have all the required dependencies installed:

| Dependency | Minimum version    | Installation                                                      |
| ---------- | ---------- | ----------------------------------------------------------------- |
| Rust       | rustc 1.81 | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` |
| Clang      | Latest     | `sudo apt-get install clang`                                      |
| Openssl    | 0.10       | `sudo apt install openssl`                                        |

Next, clone the repository:
```bash
git clone https://github.com/madara-alliance/madara
cd madara
```

Then you are ready to build the project. This will take some minutes:
```bash
cargo build
```

### Option 2: Install with Docker

Download the required Docker images.

```bash
docker pull ghcr.io/madara-alliance/madara:latest
docker tag ghcr.io/madara-alliance/madara:latest madara:latest
docker rmi ghcr.io/madara-alliance/madara:latest
```

## Start the chain

### If built from source

Run a local devnet with:
```bash
cargo run -- --name Madara --devnet --base-path ../madara_db --chain-config-override=chain_id=abcabc
```

Notes about the parameters:
1. All data is stored in a new database folder denoted by `base-path` parameter. Use a suitable location.
1. It is important to NOT use a chain ID that's being utilized by some [existing Starknet network](https://github.com/starknet-io/starknet.js/blob/8fb2193462b5bb743f551cdec631d5923f09e657/src/constants.ts#L44). Otherwise you are free to use any hexadecimal ID you want.

Leave the devnet running in one terminal window and open another one for interaction.

### If using Docker

Run Madara with:
```bash
docker run -p 9944:9944  --name Madara madara:latest --devnet --rpc-external
```

To make sure that Madara is running correctly, you can check its logs, in another terminal, with:
```bash
docker logs -f -n 100 Madara
```

#### Restart

If you need to restart Madara, you should first remove its Docker container with:
```bash
docker rm -f Madara
```