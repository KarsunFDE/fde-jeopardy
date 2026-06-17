# FDE Jeopardy — Host Guide & Answer Key

> Second-screen companion to the projected game. Learners never see this. Each clue lists the **correct response**, the **FDE teaching point**, whether it's a **TRAP** (with the tempting wrong answer), and the source week.

## How to run it (4 lines)

1. Project `index.html` (or the GitHub Pages URL). Three teams = the three fixed pairs — rename them inline on the scoreboard.

2. Click a tile to show a clue; click again or press **Space** to reveal the response; **Esc** returns to the board.

3. You adjudicate each team's "What is …?" answer, then use the scoreboard **+ / −** buttons to apply the clue value (or Daily Double wager).

4. Toggle **Round** (Jeopardy ⇄ Double Jeopardy), **Timer**, and **Sound** in the top bar; run **Final Jeopardy** from its button (category → wagers → clue → response).

## Daily Double locations

- **Jeopardy** · GROUNDING & CITATIONS · $600
- **Double Jeopardy** · AGENTIC ANTI-PATTERNS · $1200
- **Double Jeopardy** · AGENTIC SYSTEMS · $2000

## Trap clues (the obvious dev answer is wrong)

- **Jeopardy** · LLM FAILURE MODES · $800
- **Jeopardy** · TO RAG OR NOT TO RAG · $200
- **Jeopardy** · THE XY PROBLEM · $600
- **Jeopardy** · GROUNDING & CITATIONS · $1000
- **Jeopardy** · STAY CALM (IT BROKE) · $600
- **Jeopardy** · OWN THE OUTCOME · $200
- **Double Jeopardy** · AGENTIC ANTI-PATTERNS · $1600
- **Double Jeopardy** · HITL & AUTHORITY · $1600
- **Double Jeopardy** · BROWNFIELD BOOBY TRAPS · $1600
- **Double Jeopardy** · CALIBRATE THE ENGINEERING · $1600
- **Double Jeopardy** · DEFEND IT TO THE CIO · $1200

---

# Round: Jeopardy

## LLM FAILURE MODES

| $ | Correct response | Source |
|---|---|---|
| $200 | What is hallucination? | W1 Thu / W1 Fri war-room |
| $400 | What is exponential backoff with jitter? | W1 Fri war-room (reliability primitives) |
| $600 | What is double-spend (paying twice for one inference)? | W1 Fri war-room (Act 3) |
| $800 ⚠️TRAP | What is fail loud (return a structured error and log the failure)? | W1 Thu pre-session §1 |
| $1000 | What is a circuit breaker? | W1 Fri war-room (Act 3) |

**$200**  

- *Clue:* Your draft cites '48 CFR 47.305-2' as a hard requirement, and the CO emails back: 'I can't find that clause anywhere — it doesn't exist.' The model invented it, confidently. What is this failure mode?  
- *Response:* **What is hallucination?**  
- *FDE teaching:* Hallucination is the canonical W1 Thu failure mode; the fix (grounding) is W2's RAG. Until then you manage it with HITL, not eliminate it.  
- *Source:* W1 Thu / W1 Fri war-room

**$400**  

- *Clue:* Your Bedrock calls start returning 429s and intermittent 5xx. A teammate wires up a tight while-loop that hammers retries instantly — and makes it worse. You replace it with the retry pattern that spaces attempts out and adds randomness (and that you'd never apply to a plain 4xx). What is it?  
- *Response:* **What is exponential backoff with jitter?**  
- *FDE teaching:* Retry 429/5xx with backoff+jitter; never retry a 4xx except 429. Calibrate reliability primitives to the actual error class.  
- *Source:* W1 Fri war-room (reliability primitives)

**$600**  

- *Clue:* A Bedrock call actually succeeded, but the response packet got lost on the wire, so your retry logic fires it again. The bill comes in — and you're charged for that inference twice. An idempotency key would have prevented this specific harm. What is the harm?  
- *Response:* **What is double-spend (paying twice for one inference)?**  
- *FDE teaching:* Read-only inference looks idempotent, but a lost-response retry double-spends. Idempotency keys (introduced W1 Fri, deepened W3 Tue) fix it.  
- *Source:* W1 Fri war-room (Act 3)

**$800 **[TRAP]****  

- *Clue:* The Bedrock JSON parse occasionally blows up. Your instinct is to wrap it in a try/except and quietly return the raw string so nothing breaks downstream — but then the regression goes invisible. Instead you do THIS, so the eval harness can see the trend. What is it?  
- *Response:* **What is fail loud (return a structured error and log the failure)?**  
- *FDE teaching:* TRAP: the tempting dev answer is 'gracefully catch and return the raw string.' That hides failures and makes regression invisible. Fail loud; the eval harness catches the trend.  
- *Source:* W1 Thu pre-session §1

**$1000**  

- *Clue:* Bedrock has been down for ten minutes and your service is mounting a retry-storm against a dependency that clearly isn't coming back. The right move is to trip a switch that fails fast and escalates to the CO — instead of hammering harder. What resilience pattern is this?  
- *Response:* **What is a circuit breaker?**  
- *FDE teaching:* Circuit breaker = stop hammering a degraded dependency, escalate to human. Reliability isn't just retrying harder.  
- *Source:* W1 Fri war-room (Act 3)


## TO RAG OR NOT TO RAG

| $ | Correct response | Source |
|---|---|---|
| $200 ⚠️TRAP | What is RAG (Retrieval-Augmented Generation)? | W1 Fri pre-session §1 |
| $400 | What is MongoDB Atlas Vector Search? | W1 Fri pre-session §2 / W2 PLAN |
| $600 | What is the sub-paragraph (clause sub-paragraph)? | W2 Tue pre-session §1–2 |
| $800 | What is parent-child indexing? | W2 Tue pre-session §5 glossary |
| $1000 | What is contextual retrieval (contextual embeddings)? | W2 Tue pre-session §3 |

**$200 **[TRAP]****  

- *Clue:* FAR/DFARS clauses get amended and supplemented constantly. A teammate proposes fine-tuning the model on the whole corpus and re-running it every time a clause changes. You point out that's impractical and expensive, and reach for the approach that grounds on the current corpus at inference time instead. What is it?  
- *Response:* **What is RAG (Retrieval-Augmented Generation)?**  
- *FDE teaching:* TRAP: 'fine-tune the model on FAR/DFARS' is the obvious-but-wrong move — impractical and expensive when clauses change. RAG cites the current corpus at inference time.  
- *Source:* W1 Fri pre-session §1

**$400**  

- *Clue:* Someone on the pair wants to bolt on Pinecone for the vector index. You push back: the stack already has a database that can serve both the document store and the vectors, keeping the federal data-residency surface small. Which vector store do you reach for instead?  
- *Response:* **What is MongoDB Atlas Vector Search?**  
- *FDE teaching:* One DB, two access patterns. Collocation (D-031) reduces the data-residency surface — an FDE 'calibrate to the situation' choice, not a default reach for Pinecone.  
- *Source:* W1 Fri pre-session §2 / W2 PLAN

**$600**  

- *Clue:* You're deciding where to cut FAR/DFARS text into chunks. Fixed 500-token windows shred clauses mid-sentence, so you let the document's own structure draw the boundary — 52.212-4(a)(1) becomes one chunk, (a)(2) the next. What structural unit is the boundary?  
- *Response:* **What is the sub-paragraph (clause sub-paragraph)?**  
- *FDE teaching:* Structure-aware chunking lets the document's own hierarchy define boundaries — but it forces the embedding model to capture fragment meaning without parent context (the trade-off parent-child indexing solves).  
- *Source:* W2 Tue pre-session §1–2

**$800**  

- *Clue:* Your clause search keeps matching the exact right sub-paragraph, but the model still answers wrong — it can't see the surrounding context. You switch to the pattern that matches on the small chunk yet hands the LLM its parent paragraph. What is it?  
- *Response:* **What is parent-child indexing?**  
- *FDE teaching:* Index small, retrieve large. One of three named answers to the 'fragment loses context' chunking trade-off.  
- *Source:* W2 Tue pre-session §5 glossary

**$1000**  

- *Clue:* Isolated clause fragments keep getting retrieved with no idea what document they came from. You evaluate an Anthropic technique that prepends a one-sentence context summary to each chunk before embedding it — reportedly cutting retrieval-failure rate by about 35%. What is it?  
- *Response:* **What is contextual retrieval (contextual embeddings)?**  
- *FDE teaching:* Contextual embeddings rescue isolated fragments by embedding them with a parent-context sentence. The W2 Wed scenario-alternative lead candidate.  
- *Source:* W2 Tue pre-session §3


## THE XY PROBLEM

| $ | Correct response | Source |
|---|---|---|
| $200 | What is 'What are you trying to accomplish?' | FDE brief Part 3 / Part 8 |
| $400 | What is X (the real underlying problem)? | FDE brief Part 3 / Part 5 |
| $600 ⚠️TRAP | What is overengineering (solving the wrong problem)? | FDE brief Part 5 (overengineering) |
| $800 | What is The Mom Test? | FDE brief Part 3 |
| $1000 | What is 'coming in hot with opinions'? | FDE brief Part 5 / Part 3 |

**$200**  

- *Clue:* A customer hands you a precise feature request and a deadline. Before you write a line of the literal ask, you ask the single most important question in your toolkit — the one that surfaces the real goal. What question is it?  
- *Response:* **What is 'What are you trying to accomplish?'**  
- *FDE teaching:* Customers ask for Y when they need X. Surface the real goal before building the literal ask.  
- *Source:* FDE brief Part 3 / Part 8

**$400**  

- *Clue:* The customer keeps asking for Y, but you've realized Y is just their guess at a fix. Solving Y instead of the thing underneath it is the most common, most expensive mistake an FDE makes. You build the answer to THIS instead. What is it?  
- *Response:* **What is X (the real underlying problem)?**  
- *FDE teaching:* Solving Y instead of X is, per the brief, 'the most common, most expensive mistake.'  
- *Source:* FDE brief Part 3 / Part 5

**$600 **[TRAP]****  

- *Clue:* A CO says 'build me a fuzzy-matching configurable dedup engine.' You spend two weeks building the robust, configurable system — and miss that all the CO actually needed was one SQL query answered by Friday. What anti-pattern did you commit?  
- *Response:* **What is overengineering (solving the wrong problem)?**  
- *FDE teaching:* TRAP: the robust, configurable system feels like 'good engineering.' But the customer cared about getting the answer by Friday. Calibrate to the situation.  
- *Source:* FDE brief Part 5 (overengineering)

**$800**  

- *Clue:* You're about to sit with an analyst and you want the truth, not flattery. Rob Fitzpatrick's method says don't ask whether they like your idea — ask about their actual life and workflow, so they 'can't lie to you.' What's it called?  
- *Response:* **What is The Mom Test?**  
- *FDE teaching:* Ask about their workflow and past behavior, not opinions about your solution. The way you surface X without leading questions.  
- *Source:* FDE brief Part 3

**$1000**  

- *Clue:* A brand-new FDE shows up at the customer site on day one with strong opinions about everything that's wrong, before understanding the environment at all. The Frontline antidote is 'become a user before you become a builder.' What first-month anti-pattern is that fixing?  
- *Response:* **What is 'coming in hot with opinions'?**  
- *FDE teaching:* Learn first 30 days. Observe the actual job before adding value. The best product ideas come from engineers who felt the pain firsthand.  
- *Source:* FDE brief Part 5 / Part 3


## GROUNDING & CITATIONS

| $ | Correct response | Source |
|---|---|---|
| $200 | What is reproducibility (auditability / citation grounding)? | W2 Mon / W2 Thu (citation grounding UI) |
| $400 | What is clause precedence (DFARS supplements FAR for DoD acquisitions)? | W2 Tue war-room / pre-session glossary |
| $600 🔵DD | What is $rankFusion (Reciprocal Rank Fusion)? | W2 Tue pre-session §3 / glossary |
| $800 | What is faithfulness? | W2 Thu war-room / W2 Fri eval harness |
| $1000 ⚠️TRAP | What is escalate to a Contracting Officer (fall back to a human)? | W2 Thu war-room (HITL #2) |

**$200**  

- *Clue:* An OIG auditor sits down with your RAG system and says: 'Show me how this answer was derived, and prove I'd get the same one again from the same sources.' Every answer has to trace back to its source chunk, clause-ID, and revision date. What load-bearing NFR is the auditor demanding?  
- *Response:* **What is reproducibility (auditability / citation grounding)?**  
- *FDE teaching:* OIG reproducibility is the load-bearing NFR. Every clause-quote links back to source chunk + clause-ID + last_revised date.  
- *Source:* W2 Mon / W2 Thu (citation grounding UI)

**$400**  

- *Clue:* A vendor emails: 'FAR 15.208(a) says 30 calendar days, but DFARS 215.371-4 references different timing — which one governs?' Your retrieval only pulled the FAR chunk and missed the supplement. To answer correctly you must encode this rule (per 48 CFR §201.104) as chunk metadata. What rule is it?  
- *Response:* **What is clause precedence (DFARS supplements FAR for DoD acquisitions)?**  
- *FDE teaching:* Dual-source retrieval over FAR alone misses the DFARS supplement; precedence per 48 CFR §201.104 must be encoded, not assumed.  
- *Source:* W2 Tue war-room / pre-session glossary

**$600 **[DAILY DOUBLE]****  

- *Clue:* Pure $vectorSearch keeps missing exact clause numbers and pure keyword $search misses paraphrases, so you decide to merge both result lists into one ranked hybrid. You reach for Atlas's built-in RRF-based operator to do the fusion. Name the operator.  
- *Response:* **What is $rankFusion (Reciprocal Rank Fusion)?**  
- *FDE teaching:* Hybrid = dense + sparse merged via RRF (score = sum of 1/(k+rank), k=60 default). The W2 Tue hybrid baseline.  
- *Source:* W2 Tue pre-session §3 / glossary

**$800**  

- *Clue:* Asked about Section M evaluation factors, the system confidently cites FAR 47.305-2 — a real clause, but about packaging. Retrieval pulled the wrong chunk and the reranker promoted it. Which RAGAS-style metric just dropped?  
- *Response:* **What is faithfulness?**  
- *FDE teaching:* Faithfulness = does the answer stay true to the retrieved context. RAG doesn't auto-fix wrong retrieval; a bad reranker can promote the wrong chunk.  
- *Source:* W2 Thu war-room / W2 Fri eval harness

**$1000 **[TRAP]****  

- *Clue:* Retrieval confidence drops below threshold on a vendor's question. A teammate suggests just lowering the threshold and shipping the best guess. Instead the platform returns a 'needs_human_review' envelope and does THIS — because only a human can publish to all vendors. What's the move?  
- *Response:* **What is escalate to a Contracting Officer (fall back to a human)?**  
- *FDE teaching:* TRAP: 'lower the threshold and ship the best guess' optimizes the wrong thing. HITL #2: when confidence drops, escalate; only the CO publishes to all vendors.  
- *Source:* W2 Thu war-room (HITL #2)


## STAY CALM (IT BROKE)

| $ | Correct response | Source |
|---|---|---|
| $200 | What is staying calm in a crisis (crisis composure)? | FDE brief Part 2 (trait 4) / Part 8 |
| $400 | What is preparation? | FDE brief Part 3 |
| $600 ⚠️TRAP | What is retreating into code? | FDE brief Part 5 |
| $800 | What is a folder-walk (directory traversal) bug? | W2 Wed war-room |
| $1000 | What is building without seeing the data? | FDE brief Part 5 / Part 7 |

**$200**  

- *Clue:* The demo crashes live in front of the customer's CEO. The great FDE quietly fixes it in four minutes, and the CEO never even realizes an engineer was on the phone. What trait — a deliverable in its own right — did that take?  
- *Response:* **What is staying calm in a crisis (crisis composure)?**  
- *FDE teaching:* 'How you handle a crisis matters as much as whether you fix it.' Composure is a deliverable.  
- *Source:* FDE brief Part 2 (trait 4) / Part 8

**$400**  

- *Clue:* A nervous junior asks how you stay so calm in incidents — 'I'm just not wired that way.' You tell them calm isn't personality: it's volunteering for on-call, taking the escalation, and living in the war room until the playbook is in your head. By the tenth incident, you've got it. What is calm, then?  
- *Response:* **What is preparation?**  
- *FDE teaching:* 'Calm is preparation, not personality.' By the 10th incident you have a playbook. The whole programme's daily war-room is this rehearsal.  
- *Source:* FDE brief Part 3

**$600 **[TRAP]****  

- *Clue:* The customer meeting gets tense and uncomfortable. You feel the pull to mutter 'let me just go fix that real quick' and bury your face in the laptop — which feels productive but abandons the room. What's this FDE anti-pattern called?  
- *Response:* **What is retreating into code?**  
- *FDE teaching:* TRAP: 'I'll just go fix it real quick' feels productive but abandons the room. Stay present; the relationship is the work too.  
- *Source:* FDE brief Part 5

**$800**  

- *Clue:* You re-index FAR Part 15 with a shiny new chunking strategy, and a week later someone notices the DFARS 215.3xx supplements silently vanished from results — turns out those files sit one directory deeper than your loader walked. What kind of bug is this?  
- *Response:* **What is a folder-walk (directory traversal) bug?**  
- *FDE teaching:* Silent data loss on re-index. The kind of regression the eval harness is supposed to catch — 'you can't trust the system you've never seen the data for.'  
- *Source:* W2 Wed war-room

**$1000**  

- *Clue:* In the famous horror story, an empty date field became epoch 1970, the Cassandra cluster spawned 2.3M keyspaces, and it demanded 14TB of RAM just to boot — all because nobody had ever looked at the real data the system would process. What anti-pattern is this the canonical example of?  
- *Response:* **What is building without seeing the data?**  
- *FDE teaching:* 'We had never seen the data this system would actually process.' Maps to hallucination/grounding: see the data before you trust the system.  
- *Source:* FDE brief Part 5 / Part 7


## OWN THE OUTCOME

| $ | Correct response | Source |
|---|---|---|
| $200 ⚠️TRAP | What are outcomes? | FDE brief Part 1 / Part 8 |
| $400 | What is enable many capabilities for a single customer? | FDE brief Part 1 |
| $600 | What is the analyst's morning being 45 minutes shorter? | FDE brief Part 1 / Part 4 |
| $800 | What is adopted (adoption)? | FDE brief Part 3 |
| $1000 | What is owning outcomes without authority? | FDE brief Part 2 (trait 5) / Part 3 |

**$200 **[TRAP]****  

- *Clue:* Asked to define the role in one line, a teammate offers 'an FDE owns customer relationships' and another tries 'customer satisfaction scores.' Both miss it. Complete the real one-liner: 'An FDE is a software engineer who owns customer ___.'  
- *Response:* **What are outcomes?**  
- *FDE teaching:* TRAP: 'relationships' or 'satisfaction scores.' Neither — outcomes: the actual results the customer is trying to achieve.  
- *Source:* FDE brief Part 1 / Part 8

**$400**  

- *Clue:* Explaining the role to a new hire using Palantir's 'Dev vs Delta' framing: a Dev builds one capability that ships to many customers. You're the Delta — so you do THIS instead. What is it?  
- *Response:* **What is enable many capabilities for a single customer?**  
- *FDE teaching:* Breadth over a customer, not depth over a feature. The defining shape of the role.  
- *Source:* FDE brief Part 1

**$600**  

- *Clue:* Your teammate is proud the PR merged. You point out the PR is just an output — the outcome is the analyst who used to burn a 45-minute Excel ritual every morning now starting their day on time. State that outcome.  
- *Response:* **What is the analyst's morning being 45 minutes shorter?**  
- *FDE teaching:* FDEs are measured on the outcome, not the merge. The daily papercut (the 45-min Excel ritual) is what you hunt for on a first site visit.  
- *Source:* FDE brief Part 1 / Part 4

**$800**  

- *Clue:* The system you shipped works perfectly and passes every test — and six months later nobody at the agency uses it. Most enterprise software dies this way, not from being broken. The thing it never got is the enemy the FDE model exists to defeat. What is it?  
- *Response:* **What is adopted (adoption)?**  
- *FDE teaching:* 'Shelfware is the enemy.' Software that gets adopted is worth infinitely more than software that sits on a shelf.  
- *Source:* FDE brief Part 3

**$1000**  

- *Clue:* To ship, you need a platform team that doesn't report to you to actually move — and you have zero authority over them. You win them by explaining the why (revenue, the renewal at stake, the customer's own words), not by issuing the what. What is this skill, often called 'the hardest'?  
- *Response:* **What is owning outcomes without authority?**  
- *FDE teaching:* Trait 5. Credibility is points you can spend; you earn the right to direct by being right and delivering.  
- *Source:* FDE brief Part 2 (trait 5) / Part 3


---

# Round: Double Jeopardy

## AGENTIC ANTI-PATTERNS

| $ | Correct response | Source |
|---|---|---|
| $400 | What is the chatty-handoff anti-pattern? | W3 Wed pre-session §2 / glossary |
| $800 | What is correlation_id (correlation-id threading)? | W3 Wed pre-session §9 / glossary |
| $1200 🔵DD | What is hand-rolling multi-agent orchestration? | W3 Wed pre-session §9 |
| $1600 ⚠️TRAP | What is 'just one more agent'? | W3 Wed pre-session §9 / FDE brief Part 7 |
| $2000 | What is between worker handoffs (the supervisor approving the next worker invocation)? | W3 Wed pre-session §9 |

**$400**  

- *Clue:* You profile a flow that should take 5 LLM calls and find it's making 30 — the supervisor re-invokes Bedrock between every single worker step 'to check progress,' buying no observability and torching latency and cost. What anti-pattern is this?  
- *Response:* **What is the chatty-handoff anti-pattern?**  
- *FDE teaching:* Chatty handoffs explode latency + cost for no value. Each extra LLM hop must earn its place.  
- *Source:* W3 Wed pre-session §2 / glossary

**$800**  

- *Clue:* Every agent in your flow writes its own AuditEvent, and a latent audit-log race that used to lose one row now loses many. You consolidate to a single audit-writer — and thread THIS identifier through every node so the whole run can be reconstructed. What identifier?  
- *Response:* **What is correlation_id (correlation-id threading)?**  
- *FDE teaching:* Audit fan-out multiplies the race from one lost row to many. Single audit-writer + correlation_id. (Item 6 fix, deferred to W5 W3C traceparent.)  
- *Source:* W3 Wed pre-session §9 / glossary

**$1200 **[DAILY DOUBLE]****  

- *Clue:* On day three a teammate wants to write the whole orchestrator from scratch instead of using LangGraph's primitives. You agree it's worth evaluating in an ADR — but it's never the path you commit to. What is the thing you're talking them out of?  
- *Response:* **What is hand-rolling multi-agent orchestration?**  
- *FDE teaching:* Don't hand-roll the orchestrator. Use the framework primitives; evaluate hand-rolling in an ADR, don't ship it on day 3.  
- *Source:* W3 Wed pre-session §9

**$1600 **[TRAP]****  

- *Clue:* Your flow already works as a single ReAct loop, but the team keeps reaching for one more specialist agent because more agents feels more capable — and each one multiplies the failure surface. Name the anti-pattern, phrased as the seductive thought itself: '_______.'  
- *Response:* **What is 'just one more agent'?**  
- *FDE teaching:* TRAP: more agents feels more capable. Each agent multiplies failure surface. Single-agent before multi-agent — calibrate engineering to the situation.  
- *Source:* W3 Wed pre-session §9 / FDE brief Part 7

**$2000**  

- *Clue:* A teammate puts the only human-approval gate on the final SSA decision and calls it done. You catch that there's an earlier handoff gate too — where the supervisor reviews the proposed worker tool-call before it fires. Where does that earlier gate live?  
- *Response:* **What is between worker handoffs (the supervisor approving the next worker invocation)?**  
- *FDE teaching:* HITL #4 = supervisor reviews the proposed worker tool-call before firing. HITL #5 (Thu) = the SSA hard gate. Don't conflate the two touchpoints.  
- *Source:* W3 Wed pre-session §9


## HITL & AUTHORITY

| $ | Correct response | Source |
|---|---|---|
| $400 | What is blast radius? | W1 Thu pre-session §7 / W1 Fri war-room |
| $800 | What is interrupt_before? | W3 Thu PLAN / W3 Wed §8 |
| $1200 | What is delegated? | W3 Wed pre-session §4 (FAR 15.308) |
| $1600 ⚠️TRAP | What is a hard interrupt (hard HITL gate)? | W3 Wed pre-session §2 / §5 questions |
| $2000 | What are authority boundaries (outcome-ownership boundaries)? | FDE brief Part 6 / Part 7 |

**$400**  

- *Clue:* Deciding whether an LLM action needs a human gate, you run the three-part test: is it reversible, what does audit demand, and THIS — how many external parties does it touch? A clause search touches none; awarding a contract or publishing a notice touches everyone. What's the third factor?  
- *Response:* **What is blast radius?**  
- *FDE teaching:* Gate on reversibility + blast radius + audit demands. A search needs no gate; awarding a contract does.  
- *Source:* W1 Thu pre-session §7 / W1 Fri war-room

**$800**  

- *Clue:* The award node keeps firing before the source-selection authority has signed off. To force the graph to pause for human approval at that node, you set this LangGraph parameter to ['ssa_review_ssdd']. What is it?  
- *Response:* **What is interrupt_before?**  
- *FDE teaching:* interrupt_before pauses the graph for human approval at a named node. The mechanism behind the hard gate.  
- *Source:* W3 Thu PLAN / W3 Wed §8

**$1200**  

- *Clue:* An auditor asks why the SSA-review node is a HARD interrupt and not a soft, optional one. You quote FAR 15.308: the source selection authority's independent judgment 'shall not be ___.' Fill in the blank that makes the gate non-negotiable.  
- *Response:* **What is delegated?**  
- *FDE teaching:* The SSA decision authority cannot be delegated — the non-negotiable regulatory justification for the hard human gate. Authority boundary, encoded in the graph.  
- *Source:* W3 Wed pre-session §4 (FAR 15.308)

**$1600 **[TRAP]****  

- *Clue:* Someone proposes gating every single handoff 'to be safe,' which would kill your throughput. You explain the supervisor→evaluator(proposal_N) read is reversible and gets a soft gate or none — but the consensus→SSA-review handoff is irreversible and gets THIS kind of gate. What is it?  
- *Response:* **What is a hard interrupt (hard HITL gate)?**  
- *FDE teaching:* TRAP: 'gate every handoff for safety' over-engineers and kills throughput. Gate the irreversible boundary; leave reversible reads ungated.  
- *Source:* W3 Wed pre-session §2 / §5 questions

**$2000**  

- *Clue:* Standing in front of the Agency CIO and OIG to defend each human gate, you realize the whole exercise is a rehearsal of owning the places where human authority must sit. Across the programme, the HITL touchpoints are best understood as these. What are they?  
- *Response:* **What are authority boundaries (outcome-ownership boundaries)?**  
- *FDE teaching:* HITL = where human authority must sit. The gate defenses ARE FDE outcome-ownership rehearsals, defended in front of CO/CIO/OIG.  
- *Source:* FDE brief Part 6 / Part 7


## AGENTIC SYSTEMS

| $ | Correct response | Source |
|---|---|---|
| $400 | What is ReAct (Reason + Act)? | W3 Tue PLAN |
| $800 | What is the supervisor-worker pattern? | W3 Wed pre-session §2 |
| $1200 | What is idempotency? | W3 Tue PLAN |
| $1600 | What is the state schema (graph state)? | W3 Thu PLAN |
| $2000 🔵DD | What is checkpointing (a checkpointer)? | W3 Thu PLAN |

**$400**  

- *Clue:* Before anyone reaches for a multi-agent shape, you wire POST /agent/intake-triage as a single agent that reasons, acts with a tool, observes the result, and loops. Name this foundational pattern.  
- *Response:* **What is ReAct (Reason + Act)?**  
- *FDE teaching:* Single-agent ReAct first (Tue), multi-agent later (Wed). Don't skip the simple loop.  
- *Source:* W3 Tue PLAN

**$800**  

- *Clue:* Your evaluator → consensus → SSA-review flow needs one agent to decide which worker fires next and when the job is done, while the workers each do one narrow task. What's this default multi-agent shape called?  
- *Response:* **What is the supervisor-worker pattern?**  
- *FDE teaching:* Supervisor routes; workers do narrow tasks. evaluator → consensus → SSA-review is the W3 flow.  
- *Source:* W3 Wed pre-session §2

**$1200**  

- *Clue:* Your read-only inference can retry all day with no harm, but the moment an agent tool starts mutating state, a retried call could apply the write twice. You add the property that makes a repeated call safe to apply exactly once. What property is it?  
- *Response:* **What is idempotency?**  
- *FDE teaching:* Read inference can retry freely; state-mutating tools need idempotency keys so a retried write applies once.  
- *Source:* W3 Tue PLAN

**$1600**  

- *Clue:* Designing your LangGraph machine, you define a TypedDict named EvaluationState and thread it through every node so each one reads and writes the same shared shape. What is that TypedDict — the thing checkpointing will persist?  
- *Response:* **What is the state schema (graph state)?**  
- *FDE teaching:* State schema design is the Thu anchor; the typed state is what checkpointing persists.  
- *Source:* W3 Thu PLAN

**$2000 **[DAILY DOUBLE]****  

- *Clue:* Your graph pauses at an interrupt_before node, the SSA goes home for the night, and approves the next morning — and the run resumes right where it stopped. The mechanism that persisted that state (MemorySaver in dev, PostgresSaver in prod) is what made it possible. What is it?  
- *Response:* **What is checkpointing (a checkpointer)?**  
- *FDE teaching:* Checkpointing persists graph state so an interrupted-for-HITL run can resume. MemorySaver dev / PostgresSaver prod.  
- *Source:* W3 Thu PLAN


## BROWNFIELD BOOBY TRAPS

| $ | Correct response | Source |
|---|---|---|
| $400 | What is javax.* (javax → jakarta)? | spring-boot-2-7-to-3-x research brief |
| $800 | What is end-of-support (EOS)? | aws-sdk-v1-to-v2 research brief |
| $1200 | What is OpenRewrite (recipe-based migration tooling)? | both research briefs |
| $1600 ⚠️TRAP | What is upgrade to 3.5 (3.x) first, then to 4.0? | spring-boot research brief §3 misconceptions |
| $2000 | What is the strangler-fig pattern? | aws-sdk-v1-to-v2 research brief §3 |

**$400**  

- *Clue:* You bump the service to Spring Boot 3 and the build explodes — hundreds of imports won't resolve until you swap one whole legacy package family over to jakarta.* What family is it?  
- *Response:* **What is javax.* (javax → jakarta)?**  
- *FDE teaching:* Spring Boot 3.x is the Jakarta EE 9+ generation. The javax→jakarta sweep (OpenRewrite UpgradeSpringBoot_3_5) is the W4 mechanical migration.  
- *Source:* spring-boot-2-7-to-3-x research brief

**$800**  

- *Clue:* You inventory acquire-gov and find it pinned to AWS SDK for Java 1.x — which as of 31 Dec 2025 gets no more patches and can't talk to newly-released Bedrock models. A teammate shrugs 'it still works, we can wait,' but in a federal procurement that's a red flag. What lifecycle milestone did v1 hit?  
- *Response:* **What is end-of-support (EOS)?**  
- *FDE teaching:* v1 (com.amazonaws.*) is EOS since 31 Dec 2025. The 'v1 still works so we can wait' answer is a procurement red flag in a federal context.  
- *Source:* aws-sdk-v1-to-v2 research brief

**$1200**  

- *Clue:* Facing both the AWS SDK v1→v2 sweep and the Spring Boot upgrade by hand would take weeks. Instead you run recipes that mechanically rewrite 70–80% of the imports and calls, leaving you only the tricky 20–30%. What's the tooling?  
- *Response:* **What is OpenRewrite (recipe-based migration tooling)?**  
- *FDE teaching:* OpenRewrite recipes (UpgradeSpringBoot_3_5, UpgradeToJava17) do the mechanical bulk; the remaining 20–30% is manual. AWS ships an OpenRewrite-style runner too.  
- *Source:* both research briefs

**$1600 **[TRAP]****  

- *Clue:* Eyeing the latest Spring Boot, you're tempted to do one heroic PR straight from 2.7 to 4.0 and be done. Spring's docs say that's explicitly wrong — acquire-gov has to make an intermediate hop first. What's the move?  
- *Response:* **What is upgrade to 3.5 (3.x) first, then to 4.0?**  
- *FDE teaching:* TRAP: 'big-bang upgrade straight to 4.0' is tempting and explicitly wrong. acquire-gov stops at 3.5.x for the cohort; 4.0 is the 'what's next' ADR.  
- *Source:* spring-boot research brief §3 misconceptions

**$2000**  

- *Clue:* Rather than a risky sed of com.amazonaws → software.amazon.awssdk, you add v2 alongside v1 (different groupId, no Maven conflict), migrate one client at a time leaf-first, and rip out v1 only when the last com.amazonaws import is gone. This incremental playbook is named after a tree-killing plant. What pattern is it?  
- *Response:* **What is the strangler-fig pattern?**  
- *FDE teaching:* Strangler-fig = wrap and replace incrementally, not big-bang. 'sed com.amazonaws → software.amazon.awssdk' is wrong: builder/Response-suffix/setter renames are invasive.  
- *Source:* aws-sdk-v1-to-v2 research brief §3


## CALIBRATE THE ENGINEERING

| $ | Correct response | Source |
|---|---|---|
| $400 | What are over-engineering and under-engineering? | FDE brief Part 2 (trait 2) |
| $800 | What is code (treat the prompt as code)? | W1 Thu pre-session §3 |
| $1200 | What is Pydantic? | W1 Thu pre-session §1–2 |
| $1600 ⚠️TRAP | What are plain Python function calls? | W1 Fri pre-session §3 / known-bad-patterns |
| $2000 | What are unit-normalized (unit-length) vectors? | W2 Tue pre-session §3 / known-bad-patterns |

**$400**  

- *Clue:* One pair ships a brittle one-off that collapses under real load; another pair builds a configurable platform for a problem one SQL query would have solved. Trait 2 says calibrate to the situation, because both of THESE leave scars. Name both failure directions.  
- *Response:* **What are over-engineering and under-engineering?**  
- *FDE teaching:* Calibrate engineering to the situation. Both directions are failures. The 'configurable dedup engine vs the Friday SQL query' lives here.  
- *Source:* FDE brief Part 2 (trait 2)

**$800**  

- *Clue:* You find the system prompt as a giant string literal buried mid-function, untested and unversioned. You pull it out and treat it as THIS instead — an architectural artifact with named sections, version control, and tests. What does the slogan say to treat the prompt as?  
- *Response:* **What is code (treat the prompt as code)?**  
- *FDE teaching:* Context engineering: prompts live in version control, have tests, are ADR-worthy. Static persona/constraints separated from dynamic RAG context.  
- *Source:* W1 Thu pre-session §3

**$1200**  

- *Clue:* Before any Bedrock response leaves your AI service, you validate its structure in strict mode (extra='forbid') so a malformed or extra field fails fast — and it has to agree with the Spring-side schema or Codex flags the drift. Which Python library are you using?  
- *Response:* **What is Pydantic?**  
- *FDE teaching:* Pydantic strict-mode on the Python side + Bean Validation on the Spring side = defense in depth. The two schemas must agree or Codex flags the drift.  
- *Source:* W1 Thu pre-session §1–2

**$1600 **[TRAP]****  

- *Clue:* You inherit code that composes steps with prompt | model | parser pipes and a RetrievalQA...run() call. On LangChain v1.0 the Chain class is gone and run() throws. You rewrite the sequence with no framework magic at all. What do you compose it with instead?  
- *Response:* **What are plain Python function calls?**  
- *FDE teaching:* TRAP: writing prompt | model | parser LCEL pipes as the foundation, or RetrievalQA.from_chain_type(...).run(). Both are deprecated v0.x patterns (brownfield Item 5).  
- *Source:* W1 Fri pre-session §3 / known-bad-patterns

**$2000**  

- *Clue:* You pick Titan Embeddings v2 at 256 dims over 1024 to buy lower cost and latency. A teammate reflexively reaches for cosine 'because it's the standard' — but Titan v2 already returns THESE, so cosine and dot-product agree and the default doesn't matter. What does Titan v2 return?  
- *Response:* **What are unit-normalized (unit-length) vectors?**  
- *FDE teaching:* Titan v2 normalizes output, so cosine = dot-product. Don't blindly pattern-match 'cosine is the standard' on non-normalized embeddings.  
- *Source:* W2 Tue pre-session §3 / known-bad-patterns


## DEFEND IT TO THE CIO

| $ | Correct response | Source |
|---|---|---|
| $400 | What is jargon? | FDE brief Part 2 (trait 3) / Part 7 |
| $800 | What is the telephone game? | FDE brief Part 3 |
| $1200 ⚠️TRAP | What is an alternative (push back with an alternative)? | FDE brief Part 2 (trait 6) / Part 8 |
| $1600 | What is throwing it over the wall? | FDE brief Part 5 / Part 6 |
| $2000 | What is underpromise and overdeliver? | FDE brief Part 3 / Part 5 |

**$400**  

- *Clue:* You have to pitch the same architecture to a CTO and an eng lead in two different languages, then survive a tier-aware defense for the CIO and OIG. The one-page test sums up trait 3: 'If you can't explain it in one page without ___, you don't understand it.' Fill the blank.  
- *Response:* **What is jargon?**  
- *FDE teaching:* Communicate across audiences. The W3 Fri defense is tier-aware: CIO Q&A vs OIG Q&A vs architecture defense — same system, three languages.  
- *Source:* FDE brief Part 2 (trait 3) / Part 7

**$800**  

- *Clue:* Your design note went PM → vendor → CO and came back unrecognizable, degraded at every hop. The fix is to stop relaying and just be in the room. What children's-game metaphor names this degradation?  
- *Response:* **What is the telephone game?**  
- *FDE teaching:* Every hop degrades the message. Be in the room. The opposite of 'throwing it over the wall.'  
- *Source:* FDE brief Part 3

**$1200 **[TRAP]****  

- *Clue:* The customer demands something you know is wrong. One teammate says 'customer's always right, just build it'; another says 'just tell them no.' Trait 6 says neither — understand the real need, then push back WITH this. What do you push back with?  
- *Response:* **What is an alternative (push back with an alternative)?**  
- *FDE teaching:* TRAP: 'the customer is always right, just build it' OR 'just say no.' Neither. Understand the real need, then offer an alternative.  
- *Source:* FDE brief Part 2 (trait 6) / Part 8

**$1600**  

- *Clue:* A vendor ships the agency a half-finished system, tells the SI to 'figure out the rest,' and blames them when it fails in production — and you can't even do that with an LLM. The FDE model exists to correct this old delivery habit. What's it called?  
- *Response:* **What is throwing it over the wall?**  
- *FDE teaching:* The FDE model is the correction to 'throw it over the wall.' AI makes this worse: you can't throw an LLM over the wall and expect customers to figure it out.  
- *Source:* FDE brief Part 5 / Part 6

**$2000**  

- *Clue:* Asked when the feature lands, you could say Monday and slip to Wednesday, or commit to Wednesday and quietly finish Tuesday. The second builds CIO trust; the first burns it — 'done Wednesday, finished Tuesday beats done Monday, finished Wednesday.' What scheduling principle is this?  
- *Response:* **What is underpromise and overdeliver?**  
- *FDE teaching:* Overpromising ('Done Monday' then delivering Wednesday) destroys trust. Credibility is points you can spend.  
- *Source:* FDE brief Part 3 / Part 5


---

# Final Jeopardy

**Category:** FIELD NOTES — THE FDE JUDGMENT CALL

**Clue:** You're at the gate defense and the Agency CIO leans in: 'Your faithfulness numbers look great and my staff are slammed — just have the AI auto-approve the routine evaluation scores and the award decisions. Ship full autonomy now.' Per the FDE mindset AND FAR 15.308, name the single move that is BOTH the right technical answer and the right FDE answer.

**Correct response:** **What is push back with an alternative — keep the human (SSA) hard-gate on the irreversible award decision (it cannot be delegated), while showing where autonomy IS safe (reversible reads / low-blast-radius steps)?**

**FDE teaching / adjudication:** This is the whole programme in one question. The trap is agreeing (the customer asked, the metrics look good) OR flatly refusing. The FDE move: understand the real need (overloaded staff = X), don't deliver the literal ask (full autonomy = Y), push back WITH an alternative grounded in FAR 15.308 (SSA authority can't be delegated) + HITL gating logic (gate the irreversible/high-blast-radius award; automate the reversible reads). Calibrate engineering to the situation, own the outcome, defend it across audiences. Good metrics never override a non-delegable authority boundary.

**Source:** FDE brief Parts 2/3/5 + W3 FAR 15.308 + W1 Fri HITL test
