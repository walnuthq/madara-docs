"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[609],{748:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>o});const a=JSON.parse('{"id":"tutorials/quickstart_chain","title":"Quickstart: start your own chain","description":"Overview","source":"@site/docs/tutorials/quickstart_chain.md","sourceDirName":"tutorials","slug":"/tutorials/quickstart_chain","permalink":"/madara-docs/tutorials/quickstart_chain","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"defaultSidebar","previous":{"title":"Tutorials","permalink":"/madara-docs/category/tutorials"}}');var c=t(4848),s=t(8453);const r={sidebar_position:1},l="Quickstart: start your own chain",i={},o=[{value:"Overview",id:"overview",level:2},{value:"Installation",id:"installation",level:2},{value:"Configure",id:"configure",level:2},{value:"Configure your account and signer",id:"configure-your-account-and-signer",level:3},{value:"Initiate a Scarb project",id:"initiate-a-scarb-project",level:3},{value:"Deploy a contract",id:"deploy-a-contract",level:2},{value:"Save an example contract locally",id:"save-an-example-contract-locally",level:3},{value:"Compile the example contract",id:"compile-the-example-contract",level:3},{value:"Values needes to be replaced",id:"values-needes-to-be-replaced",level:2},{value:"Deploy the contract",id:"deploy-the-contract",level:2},{value:"Declare your contract",id:"declare-your-contract",level:3},{value:"Deploy it",id:"deploy-it",level:3},{value:"Issue transactions",id:"issue-transactions",level:2},{value:"Next steps",id:"next-steps",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.header,{children:(0,c.jsx)(n.h1,{id:"quickstart-start-your-own-chain",children:"Quickstart: start your own chain"})}),"\n",(0,c.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,c.jsx)(n.p,{children:"This quick-start guide helps you start your own, local chain with Madara. Furthermore, it instructs you to deploy a contract and run transactions on the chain to verify its functionality."}),"\n",(0,c.jsx)(n.p,{children:"The used chain is only available locally and is meant for testing purposes."}),"\n",(0,c.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,c.jsxs)(n.p,{children:["These installation instructions assume you are using a Linux or macOS. For Windows, please utilize ",(0,c.jsx)(n.a,{href:"https://learn.microsoft.com/en-us/windows/wsl/",children:"WSL2"}),"."]}),"\n",(0,c.jsx)(n.p,{children:"Before installing specific tooling, make sure your system is up to date:"}),"\n",(0,c.jsxs)(n.ol,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"sudo ap update"})}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.code,{children:"sudo apt upgrade"})}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"Then continue with the specific tooling:"}),"\n",(0,c.jsxs)(n.ol,{children:["\n",(0,c.jsxs)(n.li,{children:["Install Madara CLI: Run ",(0,c.jsx)(n.code,{children:"curl -L https://install.madara.build | bash"})," to install ",(0,c.jsx)(n.code,{children:"madaraup"}),". Then restart your terminal and run ",(0,c.jsx)(n.code,{children:"madaraup"})," to install the CLI."]}),"\n",(0,c.jsxs)(n.li,{children:["Install ",(0,c.jsx)(n.a,{href:"https://book.starkli.rs",children:"Starkli"})," CLI: Run ",(0,c.jsx)(n.code,{children:"curl https://get.starkli.sh | sh"})," to install ",(0,c.jsx)(n.code,{children:"starkliup"}),". Then restart your terminal and run ",(0,c.jsx)(n.code,{children:"starkliup"})," to install the CLI."]}),"\n",(0,c.jsxs)(n.li,{children:["Install ",(0,c.jsx)(n.a,{href:"https://docs.swmansion.com/scarb/",children:"Scarb"})," CLI: Run ",(0,c.jsx)(n.code,{children:"curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh"}),". Then restart your terminal."]}),"\n"]}),"\n",(0,c.jsx)(n.p,{children:"TODO: fix Madara installation."}),"\n",(0,c.jsx)(n.h2,{id:"configure",children:"Configure"}),"\n",(0,c.jsx)(n.h3,{id:"configure-your-account-and-signer",children:"Configure your account and signer"}),"\n",(0,c.jsx)(n.p,{children:"Before you can interact with the network you need an account. Luckily, running the devnet gives you a few ready accounts and their respective private keys. This is only possible because the network is a fresh network and you have full control over it - in real networks you need to get an account by different means."}),"\n",(0,c.jsx)(n.p,{children:"However, you still need to store the account in a format understood by Starkli."}),"\n",(0,c.jsx)(n.p,{children:"Choose an account from the list displayed upon running the devnet. Store it with (replace the address with one you chose from the list):"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"starkli account fetch --rpc http://localhost:9944 --output ./account 0x07484e8e3af210b2ead47fa08c96f8d18b616169b350a8b75fe0dc4d2e01d493\n"})}),"\n",(0,c.jsx)(n.h3,{id:"initiate-a-scarb-project",children:"Initiate a Scarb project"}),"\n",(0,c.jsx)(n.p,{children:"You should instantiate a new Scarb project. Go to an empty folder and run:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{children:"scarb init --no-vcs --test-runner cairo-test\n"})}),"\n",(0,c.jsx)(n.h2,{id:"deploy-a-contract",children:"Deploy a contract"}),"\n",(0,c.jsx)(n.h3,{id:"save-an-example-contract-locally",children:"Save an example contract locally"}),"\n",(0,c.jsxs)(n.p,{children:["We will use a very simple balance contract as an example. Replace the contents of ",(0,c.jsx)(n.code,{children:"src/lib.cairo"})," with:"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-rust",children:"#[starknet::interface]\ntrait IBalance<T> {\n    // Returns the current balance.\n    fn get(self: @T) -> u128;\n    // Increases the balance by the given amount.\n    fn increase(ref self: T, a: u128);\n}\n\n#[starknet::contract]\nmod Balance {\n    use traits::Into;\n\n    #[storage]\n    struct Storage {\n        value: u128, \n    }\n\n    #[constructor]\n    fn constructor(ref self: ContractState) {\n        self.value.write(5);\n    }\n\n    #[abi(embed_v0)]\n    impl Balance of super::IBalance<ContractState> {\n        fn get(self: @ContractState) -> u128 {\n            self.value.read()\n        }\n        fn increase(ref self: ContractState, a: u128)  {\n            self.value.write( self.value.read() + a );\n        }\n    }\n}\n"})}),"\n",(0,c.jsxs)(n.p,{children:["Next, replace the contents of ",(0,c.jsx)(n.code,{children:"Scarb.toml"})," with:"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-rust",children:'[package]\nname = "madara_example"\nversion = "0.1.0"\n\n[dependencies]\nstarknet = "=2.9.2"\n\n[[target.starknet-contract]]\n'})}),"\n",(0,c.jsx)(n.p,{children:"TODO: document to fix the version to one we have installed"}),"\n",(0,c.jsx)(n.h3,{id:"compile-the-example-contract",children:"Compile the example contract"}),"\n",(0,c.jsx)(n.p,{children:"Compile the contract with:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"scarb build\n"})}),"\n",(0,c.jsx)(n.h2,{id:"values-needes-to-be-replaced",children:"Values needes to be replaced"}),"\n",(0,c.jsx)(n.p,{children:"The rest of these instructions may require you to replace some of the values in the commands in the following way:"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["Value ",(0,c.jsx)(n.code,{children:"0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2"})," is used as a private key everywhere. You may choose whicheven private key from the list of keys given upon launching the devnet"]}),"\n",(0,c.jsxs)(n.li,{children:["Value ",(0,c.jsx)(n.code,{children:"0x043539387d5f6359716da16fbff9c1536b54c1f5928fbc4a1ea7ea71414d02ab"})," is used as the contract's class hash value. Use the one given upon declaring the contract."]}),"\n",(0,c.jsxs)(n.li,{children:["Value ",(0,c.jsx)(n.code,{children:"0x0709ad164816e9d9f5eaf0d50fdc671bf6d683d9dc36b6d"})," is used as the contract's address. Use the one given upon deploying the contract."]}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"deploy-the-contract",children:"Deploy the contract"}),"\n",(0,c.jsx)(n.h3,{id:"declare-your-contract",children:"Declare your contract"}),"\n",(0,c.jsx)(n.p,{children:"Before deployment, the contract needs to be declared to the network. Declare it with (remember to use the private key you chose from the devnet list):"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"starkli declare --rpc http://localhost:9944 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2 --compiler-version 2.9.1  --account account ./target/dev/madara_example_Balance.contract_class.json\n"})}),"\n",(0,c.jsx)(n.p,{children:"Note the resulting class hash."}),"\n",(0,c.jsx)(n.h3,{id:"deploy-it",children:"Deploy it"}),"\n",(0,c.jsx)(n.p,{children:"You are now ready to deploy the contract. Remember to replace the class hash and private key - you can then deploy with:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"starkli deploy 0x043539387d5f6359716da16fbff9c1536b54c1f5928fbc4a1ea7ea71414d02ab --rpc http://localhost:9944 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2 --account account\n"})}),"\n",(0,c.jsx)(n.p,{children:"Note the resulting contract address."}),"\n",(0,c.jsx)(n.h2,{id:"issue-transactions",children:"Issue transactions"}),"\n",(0,c.jsx)(n.p,{children:"The contract keeps track of an imaginary balance. Let's first query the initial balance:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"starkli call --rpc http://localhost:9944 0x0709ad164816e9d9f5eaf0d50fdc671bf6d683d9dc36b6def83bef293f23a420 get\n"})}),"\n",(0,c.jsxs)(n.p,{children:["You should see value ",(0,c.jsx)(n.code,{children:"5"})," as the initial value (prefixed by a lot of zeros)."]}),"\n",(0,c.jsx)(n.p,{children:"Let's try to increase this value by a transaction. Run:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{children:"starkli invoke --account account --rpc http://localhost:9944 --private-key 0x0410c6eadd73918ea90b6658d24f5f2c828e39773819c1443d8602a3c72344c2  0x0709ad164816e9d9f5eaf0d50fdc671bf6d683d9dc36b6def83bef293f23a420 increase 3\n"})}),"\n",(0,c.jsxs)(n.p,{children:["If you now query the balance again, you should see value ",(0,c.jsx)(n.code,{children:"8"}),". Congratulations, you have successfully modified the contract state!"]}),"\n",(0,c.jsx)(n.h2,{id:"next-steps",children:"Next steps"}),"\n",(0,c.jsx)(n.p,{children:"TODO"})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>l});var a=t(6540);const c={},s=a.createContext(c);function r(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:r(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);