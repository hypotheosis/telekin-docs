# Client coverage research

Date checked: 2026-11-12 (from `date -u +%Y-%m-%d`). All facts below come from vendor documentation fetched on that date. Where a docs page was silent, the cell says "unconfirmed" and nothing is guessed.

Goal: connect to a remote MCP server over streamable HTTP, authenticating with `Authorization: Bearer <your key>`, with write tools allowed.

## Summary table

| Client | Streamable HTTP | Custom `Authorization` header | Writes | Verdict | Docs URL | Checked |
|---|---|---|---|---|---|---|
| claude.ai (web) | Yes (Advanced > Transport; URL ending `/sse` selects SSE) | Request headers (BETA, limited organizations) not used; connects via OAuth (Telekin supports it as of 2026-11-12) | Yes (approval prompts, per-tool block) | Full page, OAuth sign-in code | https://claude.com/docs/connectors/custom/remote-mcp | 2026-11-12 |
| Claude Desktop | Same connectors as claude.ai | Same as claude.ai | Same | Full page (share with claude.ai) | https://claude.com/docs/connectors/custom/remote-mcp | 2026-11-12 |
| Claude mobile (iOS/Android) | Connectors added on web/desktop appear in the app; adding on mobile is "beta" per support article | Set on web/desktop, not in the app | Same | No own page; one note on the claude.ai page | https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp | 2026-11-12 |
| Claude Code | Yes (`--transport http`; SSE deprecated) | Yes, `--header` / `-H` flag, or `headers` key in `.mcp.json` | Yes (permission prompts) | Full page | https://code.claude.com/docs/en/mcp | 2026-11-12 |
| Cursor | Yes (docs list "Streamable HTTP" as a remote transport) | Yes, `headers` object in `mcp.json` | Not restricted in docs (unconfirmed wording) | Full page | https://cursor.com/docs/context/mcp | 2026-11-12 |
| VS Code (GitHub Copilot) | Yes (`"type": "http"`; falls back to SSE) | Yes, `headers` object; `inputs` for the secret | Yes, tool approvals apply | Full page | https://code.visualstudio.com/docs/agents/reference/mcp-configuration | 2026-11-12 |
| Windsurf | Yes (docs: stdio, Streamable HTTP, SSE) | Yes, `headers` object in `mcp_config.json` | Not restricted in docs (unconfirmed wording) | Full page, with file-location caveat | https://docs.devin.ai/windsurf/plugins/cascade/mcp | 2026-11-12 |
| OpenAI Codex CLI | Yes (`url` servers; section is about streamable HTTP) | Yes, `bearer_token_env_var` sends `Authorization: Bearer`; also `http_headers` | Not restricted in docs (unconfirmed wording) | Full page | https://learn.chatgpt.com/docs/extend/mcp?surface=cli | 2026-11-12 |
| ChatGPT | Yes (SSE and streaming HTTP) | No. Auth is OAuth, none, or either; custom API keys/headers not supported. Connects via OAuth (Telekin supports it as of 2026-11-12) | Yes, with confirmation | Full page, OAuth sign-in code | https://developers.openai.com/api/docs/guides/custom-mcp-server | 2026-11-12 |
| Gemini CLI | Yes (`httpUrl`) | Yes, `headers` in `settings.json` or `--header` / `-H` | Not restricted in docs | Full page, with plan caveat | https://geminicli.com/docs/tools/mcp-server/ | 2026-11-12 |
| Zed | Unconfirmed (page does not name transports) | Yes, `headers` in `context_servers` | Tool actions confirmed by default | Leave out (unconfirmed) | https://zed.dev/docs/ai/mcp | 2026-11-12 |
| Cline | Yes (`"type": "streamableHttp"`) | Yes, `headers` in `cline_mcp_settings.json`; `--header` in CLI | Not restricted (`autoApprove` list available) | Full page | https://docs.cline.bot/mcp/configuring-mcp-servers | 2026-11-12 |
| Continue | Yes (`type: streamable-http`) | Unconfirmed (reference says `requestOptions` applies, but no remote example and no URL field documented) | Unconfirmed | Leave out (unconfirmed) | https://docs.continue.dev/customize/deep-dives/mcp | 2026-11-12 |
| JetBrains AI Assistant | Yes (Streamable HTTP, SSE) | Unconfirmed (docs show only `url`; no headers field documented) | Unconfirmed | Leave out (unconfirmed) | https://www.jetbrains.com/help/ai-assistant/mcp.html | 2026-11-12 |
| LM Studio | Unconfirmed (page says only "local and remote") | Yes (example uses `headers` with `Authorization`) | Unconfirmed | Leave out (unconfirmed) | https://lmstudio.ai/docs/app/mcp | 2026-11-12 |

Suggested pages: full pages for claude.ai (also covering Claude Desktop and a note on mobile), Claude Code, Cursor, VS Code, Windsurf, Codex CLI, Gemini CLI, Cline. Full page for ChatGPT (OAuth). Everything else is under "Unconfirmed: for the founder".

---

## claude.ai, Claude Desktop, Claude mobile

Sources: https://claude.com/docs/connectors/custom/remote-mcp and https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp

- Custom connectors are available on Free, Pro, Max, Ultra, Team and Enterprise plans. Free plans can add one custom connector.
- Team and Enterprise: an Owner adds the connector under Organization settings > Connectors (Add > Custom; choose Web if asked). Members then click Connect. Enterprise members with a custom role that includes managing libraries can also add it. Everyone on that connector shares the one credential.
- Claude connects from Anthropic's cloud, so the server must be reachable from the public internet.
- Write tools are not blocked. The user approves tool calls, can choose "Always allow", and can block individual tools under Customize > Connectors.
- Superseded 2026-11-12: Telekin now supports OAuth, so the Telekin page uses OAuth with a sign-in code, not Request headers, and the beta caveat no longer applies to it. For reference, the docs say "Request header authentication is in beta and available to a limited set of organizations. If you don't see the Request headers section in the Add custom connector dialog, your organization doesn't have access yet." Pages must say this plainly.
- Header names are reviewed by Anthropic; `authorization` and `x-api-key` are in the offered list. Up to four headers. Claude sends the value exactly as typed, so the value must include `Bearer `.
- Authentication settings cannot be changed after adding. To change the key, remove the connector and add it again.
- Transport: Advanced > Transport; a URL ending in `/sse` selects the older SSE transport. Streamable HTTP is the default for a normal URL (the docs say to change Transport only if the server's docs say to).

Steps for the Request-headers (key) route, no longer used by the Telekin page (the OAuth route replaces steps 4 and 5 with: choose OAuth if asked, leave client ID/secret empty, then sign in with a sign-in code in the browser):

1. Go to Customize > Connectors.
2. Select Add, then Add custom connector.
3. Enter a name and `<server URL>`, then click Continue.
4. Authentication: choose "No sign-in". (Docs: "If the server uses an API key, choose No sign-in and add the key under Request headers.")
5. Open Request headers. Choose the header name `authorization` (from the list, or Custom header). Enter the value `Bearer <your key>` (include the word Bearer and a space). Mark it Required.
6. Click Add.
7. In a chat, click the + button, choose Connectors, and turn the connector on for that conversation.

(The older support article words the same steps as: Customize > Connectors > "+ Add" > "Add custom connector" > name and URL > Continue > Authentication "No sign in" > "Request headers" > Add.)

Claude Desktop: same connectors, same settings page. The MCP project's remote-server guide (https://modelcontextprotocol.io/docs/develop/connect-remote-servers) says: Settings (Ctrl+Comma, or menu > File > Settings), then Connectors in the sidebar, then Add > Add custom connector. Not separately documented otherwise; treat as identical to claude.ai.

Claude mobile: the support article gives no add-connector steps for the apps. A web search summary of Anthropic's support pages says connectors set up on web or desktop appear in the iOS and Android apps after next login, and that installing connectors on mobile is "beta". This second point came from a search summary of https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities and was not read directly: UNCONFIRMED. Recommend: one sentence, "set it up on the web or desktop, then it shows up in the mobile app", flagged as unconfirmed until the founder tests it.

---

## Claude Code

Source: https://code.claude.com/docs/en/mcp (checked 2026-11-12)

- Streamable HTTP: yes (`--transport http`). SSE is deprecated; v2.1.265+ tries HTTP first and falls back to SSE automatically.
- Header: `--header` (short `-H`), one header per flag. Or `headers` in `.mcp.json`.
- Scopes (`-s` / `--scope`): `local` (default, current project only), `project` (shared via `.mcp.json`), `user` (all your projects). Local and user are stored in `~/.claude.json`.
- Writes: not blocked; Claude Code asks permission per tool use.
- Plan limits: none found on the page (the page was only partly readable; the last section was not checked). Treat as "none documented".
- Caveat: in `url`/`headers`, references to `ANTHROPIC_API_KEY` and `ANTHROPIC_AUTH_TOKEN` are read as empty; name your own variable.

Command (docs form is `claude mcp add --transport http <name> <url> --header "Authorization: Bearer ..."`; the task's known command with `--scope user` matches it):

```bash
claude mcp add --transport http --scope user okf-mcp <server URL> --header "Authorization: Bearer <your key>"
```

Config-file alternative (`.mcp.json`, with the key in an environment variable):

```json
{
  "mcpServers": {
    "okf-mcp": {
      "type": "http",
      "url": "<server URL>",
      "headers": {
        "Authorization": "Bearer ${OKF_KEY}"
      }
    }
  }
}
```

(`type` also accepts `streamable-http`. An entry with `url` but no `type` is treated as stdio and skipped.)

Verify: `claude mcp list`, or `/mcp` inside a session. (Verification commands are from general knowledge of the CLI, not quoted from the fetched text: unconfirmed wording.)

---

## Cursor

Source: https://cursor.com/docs/context/mcp (checked 2026-11-12)

- File: `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project).
- Transports: docs list SSE and Streamable HTTP, both given as a `url`; the page does not say how Cursor tells them apart.
- Headers: `headers` object; env interpolation `${env:NAME}` works in `headers` and `url`.
- OAuth is used only if no static credentials; not needed here.
- Plan limits: none mentioned on the page. Write-tool wording: none on the page.

```json
{
  "mcpServers": {
    "okf-mcp": {
      "url": "<server URL>",
      "headers": {
        "Authorization": "Bearer <your key>"
      }
    }
  }
}
```

Safer variant (docs example form): `"Authorization": "Bearer ${env:OKF_KEY}"`, with `OKF_KEY` set in the shell profile. Remote servers do not support `envFile`.

The settings screen name for viewing servers (Cursor Settings > MCP / Tools) was not in the fetched text: UNCONFIRMED; don't name UI paths on the page beyond the file.

---

## VS Code (GitHub Copilot agent mode)

Sources: https://code.visualstudio.com/docs/agents/reference/mcp-configuration and https://code.visualstudio.com/docs/copilot/customization/mcp-servers (checked 2026-11-12)

- `"type": "http"` is Streamable HTTP. The client "first tries the Streamable HTTP transport and falls back to SSE if HTTP is not supported."
- Files: workspace `.vscode/mcp.json`, or the user-profile `mcp.json`. Top-level key is `servers`. NOTE: the docs now say new Copilot configurations should prefer the native files `~/.copilot/mcp-config.json` (or `$COPILOT_HOME/mcp-config.json`) and a workspace-root `.mcp.json`, which use `mcpServers` and `${NAME}` environment-variable references, and do NOT support `inputs`. The page also says the Local harness is deprecated and will be removed in February 2027. So two valid formats exist; the writer must pick one and say which. Recommended: the editor-managed `.vscode/mcp.json` with `inputs`, because it prompts for the key and stores it securely (but see the harness note: servers needing `inputs` are not forwarded to Copilot harness sessions; unconfirmed whether that matters to a normal user).
- Guided UI: run "MCP: Add Server" from the Command Palette, or "Chat: Open Customizations" > MCP Servers > Add Server (+). Pick "HTTP (HTTP or Server-Sent Events)", enter the URL, a server ID, then Global or Workspace. The UI flow does not show where to type a header; edit the JSON afterwards.
- Writes: tools go through per-call approvals; not blocked. Plan/org limits: the page says availability "depends on organization policy" for marketplace discovery and mentions a `chat.mcp.access` setting; Copilot plan limits not stated: unconfirmed.
- Secrets: don't commit populated Authorization headers.

Editor-managed format:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "okf-key",
      "description": "Telekin key",
      "password": true
    }
  ],
  "servers": {
    "okf-mcp": {
      "type": "http",
      "url": "<server URL>",
      "headers": {
        "Authorization": "Bearer ${input:okf-key}"
      }
    }
  }
}
```

VS Code prompts for the value the first time the server starts, then stores it. (If a reader would rather paste `<your key>` directly, replace the `Bearer ${input:okf-key}` value with `Bearer <your key>` and drop `inputs`.)

Native Copilot format (from the same page; `headers` support in this file is implied by the shared format but was not shown in its example: UNCONFIRMED):

```json
{"mcpServers": {"okf-mcp": {"type": "http", "url": "<server URL>", "tools": ["*"]}}}
```

---

## Windsurf

Source: https://docs.devin.ai/windsurf/plugins/cascade/mcp (docs.windsurf.com redirects here; checked 2026-11-12)

- Transports: stdio, Streamable HTTP, SSE. Remote entries need `serverUrl` or `url`.
- Headers: `headers` object; docs say `${env:NAME}` interpolation works in `command`, `args`, `env`, `serverUrl`, `url`, `headers`. The docs' own example header name is `API_KEY` (e.g. `"API_KEY": "Bearer ${env:AUTH_TOKEN}"`); the docs do not show an `Authorization` header literally, but `headers` takes arbitrary names, so `Authorization` is expected to work. Mark "expected, not shown in docs".
- Open the config: Settings > Tools > Windsurf Settings > Add Server, or the "Open MCP config file" action in Cascade's MCP menu.
- FILE LOCATION AMBIGUITY: the docs give `~/.config/devin/mcp_config.json` (macOS/Linux; `%AppData%/devin/mcp_config.json` on Windows) for the Cascade action, and `~/.codeium/windsurf/mcp_config.json` for editor discovery (needs setting `chat.mcp.discovery.enabled` with the `windsurf` source). Tell readers to use the "Open MCP config file" action rather than a path.
- Plans: Enterprise users must turn MCP on in settings. Team admins can toggle MCP and allowlist servers; once one server is allowlisted, all others are blocked for the team. No tool-count limit appeared on the page.
- Writes: nothing restricting them on the page.

```json
{
  "mcpServers": {
    "okf-mcp": {
      "serverUrl": "<server URL>",
      "headers": {
        "Authorization": "Bearer <your key>"
      }
    }
  }
}
```

After saving, press the refresh button in the MCP menu (docs mention refresh after adding a plugin).

---

## OpenAI Codex CLI

Source: https://learn.chatgpt.com/docs/extend/mcp?surface=cli (developers.openai.com/codex/mcp redirects here; checked 2026-11-12)

- File: `~/.codex/config.toml`, or project `.codex/config.toml` for trusted projects. Each server is a `[mcp_servers.<name>]` table.
- `url` (required). `bearer_token_env_var`: name of an environment variable holding the token; Codex sends it in `Authorization` as a bearer token. `http_headers`: static name/value map. `env_http_headers`: name-to-environment-variable map (no TOML example on the page; syntax is inferred: UNCONFIRMED).
- The CLI `codex mcp add` documents `--url` and `--oauth-client-id`; no bearer-token flag is documented. Use the config file for the key.
- The fetched text did not use the words "streamable HTTP" in the quoted parts; the transport for `url` servers is therefore inferred from the page's streamable-HTTP section heading in the original question, and should be confirmed by the founder before the page says "streamable HTTP" in Codex's own voice. Marked: mostly confirmed.
- Writes and plan limits: not stated on the page.

```toml
[mcp_servers.okf-mcp]
url = "<server URL>"
bearer_token_env_var = "OKF_KEY"
```

Then set the variable in the shell that starts Codex: `export OKF_KEY="<your key>"` (the variable holds the key alone, without the word Bearer; the docs describe it as a bearer token, so Codex adds the scheme: described as "a bearer token to send in `Authorization`").

---

## Gemini CLI

Source: https://geminicli.com/docs/tools/mcp-server/ (checked 2026-11-12)

- `httpUrl` = Streamable HTTP; `url` = SSE. No `type` key; the key you pick selects the transport.
- `headers` object supported with either.
- CLI: `gemini mcp add --transport http --header "Authorization: Bearer abc123" <name> <url>`. Scope flag `-s user` writes `~/.gemini/settings.json`; default scope is project (`.gemini/settings.json`).
- Avoid underscores in server names (use `my-server`).
- Plan caveat from the page: Gemini CLI was replaced by Antigravity CLI for unpaid-tier and Google One users on June 18, 2026. Whether Antigravity CLI uses the same MCP config is UNCONFIRMED. The page must say "if you use Gemini CLI" and not promise anything for Antigravity.
- Writes: not restricted on the page.

```bash
gemini mcp add --transport http --scope user --header "Authorization: Bearer <your key>" okf-mcp <server URL>
```

or in `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "okf-mcp": {
      "httpUrl": "<server URL>",
      "headers": {
        "Authorization": "Bearer <your key>"
      }
    }
  }
}
```

(The `--scope user` combined with `--header` before the name follows the docs' example order `--transport http --header "..." name url`; `-s` is documented, so the combined command is expected to work but was not shown verbatim: mark "expected".)

---

## Cline

Source: https://docs.cline.bot/mcp/configuring-mcp-servers (checked 2026-11-12)

- Extension: click the MCP Servers icon in the Cline panel toolbar. Remote Servers tab: Server Name, Server URL, Transport Type (Streamable HTTP recommended / SSE legacy), Add Server. To add a header, go to the Configure tab > Configure MCP Servers, which opens the settings JSON.
- CLI file: `~/.cline/data/settings/cline_mcp_settings.json` (override with `CLINE_MCP_SETTINGS_PATH`).
- `type` selects the transport; omitting it defaults to legacy `sse`, so always write `"type": "streamableHttp"`.
- CLI add: `cline mcp add <name> <url> --transport http --header "..." --yes`.
- Writes: not restricted; `autoApprove` lists tools that skip approval. Plan limits: none on the page.

```json
{
  "mcpServers": {
    "okf-mcp": {
      "type": "streamableHttp",
      "url": "<server URL>",
      "headers": {
        "Authorization": "Bearer <your key>"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

---

## ChatGPT (connects via OAuth)

Source: https://developers.openai.com/api/docs/guides/custom-mcp-server (checked 2026-11-12); plus a search-result summary of https://developers.openai.com/plugins/build/auth (not read directly).

- Custom MCP servers are added in ChatGPT on the web (Plugins: name, optional description, Server URL, authentication, create, then install). SSE and streaming HTTP supported.
- Authentication options: OAuth, no authentication, or OAuth-or-no-authentication. The custom-server page does not mention custom headers or API keys. The auth page summary says ChatGPT cannot present custom API keys. Conclusion: no way to send a static `Authorization` header; needs OAuth.
- Write actions need confirmation by default (tools lacking a `readOnlyHint` annotation are treated as writes).
- Which plans include custom MCP servers: not stated on the page (UNCONFIRMED). Workspace permissions and Lockdown can restrict it.
- Update 2026-11-12: ChatGPT needs OAuth, and Telekin now supports OAuth with single-use sign-in codes, so the page is a full connect page. Menu names are hedged ("look for") on the page.

---

## Zed (unconfirmed)

Source: https://zed.dev/docs/ai/mcp (checked 2026-11-12)

- Settings > AI > MCP Servers > Add Server > Add Remote Server writes to `settings.json` under `context_servers`. Example from the docs: `"remote-mcp-server": { "url": "https://example.com/mcp", "headers": { "Authorization": "Bearer <token>" } }`. With no `Authorization` header, Zed starts the OAuth flow.
- The page does not name streamable HTTP or SSE. Tool actions need confirmation by default (`agent.tool_permissions.default` is `"confirm"`).
- Free-plan behaviour: not stated.
- Verdict: header OK, transport unconfirmed. Leave out until the founder confirms (a `url` ending in `/mcp` is probably streamable HTTP, but the docs do not say).

## Continue (unconfirmed)

Sources: https://docs.continue.dev/customize/deep-dives/mcp and https://docs.continue.dev/reference (checked 2026-11-12)

- Example: `mcpServers: - name: Name, type: streamable-http, url: https://....`. Files in `.continue/mcpServers` need `name`, `version`, `schema` metadata. MCP works only in agent mode.
- The reference says `requestOptions` applies to `sse` and `streamable-http` servers and shares the model `requestOptions` format, which has `headers`. But it lists `command` as required and documents no `url` field, and shows no remote example with headers. Header placement is inference only.
- Leave out until the founder tests `requestOptions.headers.Authorization` on a real server.

## JetBrains AI Assistant (unconfirmed)

Source: https://www.jetbrains.com/help/ai-assistant/mcp.html (first 100,000 characters read; the remaining ~11,800 only partly checked: no header or plan info in them)

- Settings | Tools | AI Assistant | Model Context Protocol (MCP) > Add > connection type HTTP > paste JSON `{ "mcpServers": { "yourServerName": { "url": "http://remote-server-address/mcp" } } }`. Streamable HTTP and SSE (`/sse`) are both supported.
- No `headers` field is documented. Leave out until confirmed.

## LM Studio (unconfirmed)

Source: https://lmstudio.ai/docs/app/mcp (checked 2026-11-12)

- Program tab > Install > Edit mcp.json. The remote example uses `"url"` and `"headers": { "Authorization": "Bearer <YOUR_HF_TOKEN>" }`. Remote servers supported since 0.3.17. The page does not state streamable HTTP. Leave out until the transport is confirmed.

---

## Unconfirmed: for the founder

1. (Superseded: the claude.ai page now uses OAuth, so this risk no longer applies.) claude.ai Request headers is BETA for a limited set of organizations. Test on your own account whether the section appears on a Free or Pro account; if not, the claude.ai page must be a "not yet" page for those who lack it. This is the single biggest risk to the Claude pages.
2. Claude mobile: whether connectors can be added in the iOS/Android apps, or only appear after being set up elsewhere (second-hand search summary only).
3. Codex CLI: transport name for `url` servers, and `env_http_headers` syntax.
4. Gemini CLI: whether Antigravity CLI uses the same config after the June 2026 replacement for unpaid users.
5. Windsurf: which config file path applies to your build; `Authorization` header not shown literally in docs.
6. VS Code: choice between `.vscode/mcp.json` (with `inputs`) and the newer native Copilot files (no `inputs`); Copilot plan and organization policy limits on MCP.
7. Cursor, Windsurf, Codex, Gemini, Cline: write-tool and plan-limit statements not found on the fetched pages; the setup pages should say "tool calls ask for your approval" only where docs said so (Claude, VS Code, ChatGPT, Zed).
8. Zed (transport), Continue (header placement), JetBrains (headers), LM Studio (transport): see sections above; none can go on the site yet.
9. ChatGPT plan availability for custom MCP servers.

## OAuth recheck (2026-11-23)

Telekin (okf-mcp, prod v0.28.0) supports OAuth with dynamic client registration, Client ID Metadata Documents and loopback redirects on any port, so every client below that supports OAuth for remote servers signs in in the browser with no key. Checked against vendor docs on 2026-11-23; the Connect pages now lead with sign-in and keep a key as the fallback.

| Client | OAuth for remote HTTP servers | How sign-in starts | Docs URL |
|---|---|---|---|
| Claude Code | Yes | `claude mcp add --transport http <name> <url>`, then `/mcp` > Authenticate or `claude mcp login <name>`; `claude mcp logout <name>` signs out. An `Authorization` header disables OAuth | https://code.claude.com/docs/en/mcp |
| VS Code (Copilot) | Yes (DCR) | Server entry with `"type": "http"` and `url` only; VS Code prompts, or Authenticate in server actions. Sign-out path in current docs: unconfirmed | https://code.visualstudio.com/docs/agents/reference/mcp-configuration |
| Windsurf | Yes ("Cascade also supports OAuth for remote servers") | `serverUrl` only; exact trigger and sign-out unconfirmed | https://docs.devin.ai/windsurf/plugins/cascade/mcp |
| Codex CLI | Yes, no flag needed | `codex mcp add <name> --url <url>`, `codex mcp login <name>` (`--no-browser`), `codex mcp logout <name>` | https://learn.chatgpt.com/docs/extend/mcp?surface=cli |
| Gemini CLI | Yes (discovery on 401, DCR) | `httpUrl` only, then `/mcp auth <name>`; needs a local browser; sign-out undocumented | https://geminicli.com/docs/tools/mcp-server/ |
| Cline | CLI only confirmed | `cline mcp` > Authorize OAuth; extension flow undocumented (key stays the primary route) | https://docs.cline.bot/mcp/connecting-to-a-remote-server |
| Cursor | Yes | `url` only (desktop redirect `http://localhost:8787/callback`) | https://cursor.com/docs/context/mcp |
| Zed | Yes | Add Remote Server with `url` only; Zed prompts for the MCP OAuth flow | https://zed.dev/docs/ai/mcp |
| JetBrains AI Assistant, Continue, LM Studio | Remote yes, OAuth unconfirmed | Still left out | see the table above |
