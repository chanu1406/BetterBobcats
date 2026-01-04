# MCP Servers Setup for GitHub Copilot

This project is configured with several MCP (Model Context Protocol) servers to enhance GitHub Copilot's capabilities in VS Code.

## Configured MCP Servers

### 1. Sequential Thinking
**Purpose**: Enables step-by-step reasoning for complex problems

**No setup required** - automatically available through npx

### 2. Context7
**Purpose**: Provides access to up-to-date library documentation

**Type**: Remote HTTP server
**URL**: https://context7.io/mcp

**No setup required** - works out of the box

### 3. GitHub
**Purpose**: Access GitHub repositories, issues, pull requests, and more

**Setup required**:
1. Create a GitHub Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `repo`, `read:org`, `read:user`
   - Copy the token

2. Update `.vscode/mcp.json`:
   - Replace `<your-github-token>` with your actual token
   
   OR create a `.env` file (recommended):
   ```bash
   cp .env.example .env
   # Edit .env and add your token
   ```

### 4. Filesystem
**Purpose**: Read and write files in your project directory

**No setup required** - configured for this project directory

**Security**: Only has access to `/Users/chanuollala/Documents/BetterBobcats`

### 5. Memory
**Purpose**: Provides persistent memory across conversations

**No setup required** - automatically available through npx

### 6. Brave Search
**Purpose**: Web search capabilities for up-to-date information

**Setup required**:
1. Get a Brave Search API key:
   - Go to https://brave.com/search/api/
   - Sign up for a free account
   - Copy your API key

2. Update `.vscode/mcp.json`:
   - Replace `<your-brave-api-key>` with your actual key
   
   OR add to `.env` file:
   ```bash
   BRAVE_API_KEY=your_key_here
   ```

### 7. Supabase
**Purpose**: Connect to your Supabase database and projects

**Type**: Remote HTTP server
**URL**: https://mcp.supabase.com/mcp

**No setup required** - uses OAuth authentication (browser-based login)

**Features**:
- Query your database with natural language
- Manage tables, migrations, and extensions
- Deploy Edge Functions
- View logs and advisors for debugging
- Generate TypeScript types from your schema

**Security**: Automatically prompts for login during first use. Recommended to use with development projects only, not production data.

## Configuration File

The MCP servers are configured in [.vscode/mcp.json](.vscode/mcp.json).

## How to Use

1. **Enable servers**: The servers are automatically enabled in VS Code
2. **Use in Copilot Chat**: Reference tools using `@` or `#` in Copilot chat
3. **Check availability**: Look for the MCP icon in VS Code's status bar

## Testing MCP Servers

You can test individual servers using the MCP Inspector:

```bash
# Test sequential thinking
npx @modelcontextprotocol/inspector npx -y @modelcontextprotocol/server-sequential-thinking

# Test memory server
npx @modelcontextprotocol/inspector npx -y @modelcontextprotocol/server-memory

# Test filesystem server
npx @modelcontextprotocol/inspector npx -y @modelcontextprotocol/server-filesystem .
```

## Available MCP Tools

Once configured, you'll have access to:

- **Sequential reasoning**: Break down complex problems step-by-step
- **Documentation lookup**: Get latest docs for any library via Context7
- **GitHub operations**: Search repos, read files, create issues, etc.
- **File operations**: Read, write, and search files in your project
- **Persistent memory**: Store and recall information across conversations
- **Web search**: Search the web for up-to-date information via Brave
- **Supabase operations**: 
  - Query databases with natural language
  - Manage tables, schemas, and migrations
  - Deploy and manage Edge Functions
  - View logs and debugging advisors
  - Generate TypeScript types from your schema
  - List projects and organizations
- **Persistent memory**: Store and retrieve information across sessions
- **Web search**: Search the web for current information

## Troubleshooting

### Servers not showing up
1. Reload VS Code window (Cmd+Shift+P → "Developer: Reload Window")
2. Check VS Code MCP logs in Output panel

### Authentication errors
1. Verify your API keys are correct
2. Check that tokens haven't expired
3. Ensure environment variables are set correctly

### Performance issues
1. Disable unused servers in `mcp.json`
2. Reduce the number of active servers

## Learn More

- [MCP Documentation](https://modelcontextprotocol.io/)
- [VS Code MCP Support](https://code.visualstudio.com/docs/copilot/copilot-mcp)
- [MCP Server Directory](https://github.com/modelcontextprotocol/servers)
