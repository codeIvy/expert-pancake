{
  description = "Codex and local-rag environment with Node.js 22";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { 
        inherit system;
        config.allowUnfree = true;
        };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_22
          codex
          claude-code
        ] ;

        shellHook = ''
          export BASE_DIR="$PWD"
        '';
      };
#testing packaging codex as per learning plan
      packages.${system} = {
        codex = pkgs.writeShellApplication {
        name = "lear with codex; ponytail disabled";
        runtimeInputs = [ pkgs.codex ];
        text = ''
        headroom wrap codex -c 'plugins."ponytail@ponytail".enabled=false'
        '';
        };
        claude = pkgs.writeShellApplication {
        name = "lear with codex; ponytail disabled";
        runtimeInputs = [ pkgs.claude-code ];
        text = ''
        headroom wrap claude
        '';
        };
    };

    };
}

