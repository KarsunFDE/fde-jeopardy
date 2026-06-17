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

- *Clue:* The W1 Thu failure mode where a model confidently invents a FAR clause that doesn't exist — like the draft that cited '48 CFR 47.305-2' as a requirement the CO couldn't find anywhere.  
- *Response:* **What is hallucination?**  
- *FDE teaching:* Hallucination is the canonical W1 Thu failure mode; the fix (grounding) is W2's RAG. Until then you manage it with HITL, not eliminate it.  
- *Source:* W1 Thu / W1 Fri war-room

**$400**  

- *Clue:* When a Bedrock call returns a 429 or 5xx, this retry pattern — not a tight loop — is the correct response, while a 4xx (other than 429) should NOT be retried at all.  
- *Response:* **What is exponential backoff with jitter?**  
- *FDE teaching:* Retry 429/5xx with backoff+jitter; never retry a 4xx except 429. Calibrate reliability primitives to the actual error class.  
- *Source:* W1 Fri war-room (reliability primitives)

**$600**  

- *Clue:* A retry that re-fires a Bedrock call which actually SUCCEEDED but whose response was lost causes THIS specific harm — solved with idempotency keys.  
- *Response:* **What is double-spend (paying twice for one inference)?**  
- *FDE teaching:* Read-only inference looks idempotent, but a lost-response retry double-spends. Idempotency keys (introduced W1 Fri, deepened W3 Tue) fix it.  
- *Source:* W1 Fri war-room (Act 3)

**$800 **[TRAP]****  

- *Clue:* Instead of wrapping the Bedrock JSON parse in a try/except with a bare-string fallback, the W1 Thu reading says to do THIS so the eval harness can catch the regression trend.  
- *Response:* **What is fail loud (return a structured error and log the failure)?**  
- *FDE teaching:* TRAP: the tempting dev answer is 'gracefully catch and return the raw string.' That hides failures and makes regression invisible. Fail loud; the eval harness catches the trend.  
- *Source:* W1 Thu pre-session §1

**$1000**  

- *Clue:* When Bedrock is persistently degraded, this resilience pattern says to FAIL FAST and surface to the CO via HITL escalation — rather than mounting a retry-storm against a service that's down.  
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

- *Clue:* Because the FAR/DFARS corpus changes constantly with amendments and supplements, the cohort grounds on the current corpus at inference time using THIS — rather than re-training the model every time a clause changes.  
- *Response:* **What is RAG (Retrieval-Augmented Generation)?**  
- *FDE teaching:* TRAP: 'fine-tune the model on FAR/DFARS' is the obvious-but-wrong move — impractical and expensive when clauses change. RAG cites the current corpus at inference time.  
- *Source:* W1 Fri pre-session §1

**$400**  

- *Clue:* The training-project's default vector store — chosen because it's already in the stack, so one database serves both the document store and the vector index, shrinking the federal data-residency surface.  
- *Response:* **What is MongoDB Atlas Vector Search?**  
- *FDE teaching:* One DB, two access patterns. Collocation (D-031) reduces the data-residency surface — an FDE 'calibrate to the situation' choice, not a default reach for Pinecone.  
- *Source:* W1 Fri pre-session §2 / W2 PLAN

**$600**  

- *Clue:* For FAR/DFARS text, the natural chunk boundary is THIS structural unit — e.g., 52.212-4(a)(1) is one chunk and (a)(2) is the next.  
- *Response:* **What is the sub-paragraph (clause sub-paragraph)?**  
- *FDE teaching:* Structure-aware chunking lets the document's own hierarchy define boundaries — but it forces the embedding model to capture fragment meaning without parent context (the trade-off parent-child indexing solves).  
- *Source:* W2 Tue pre-session §1–2

**$800**  

- *Clue:* This W2 retrieval pattern indexes the small sub-paragraph chunk for matching but RETURNS the larger parent paragraph to the LLM, so the model sees enough context to reason.  
- *Response:* **What is parent-child indexing?**  
- *FDE teaching:* Index small, retrieve large. One of three named answers to the 'fragment loses context' chunking trade-off.  
- *Source:* W2 Tue pre-session §5 glossary

**$1000**  

- *Clue:* This Anthropic Sept-2024 technique prepends a one-sentence context summary to each chunk BEFORE embedding it, reportedly cutting retrieval-failure rate by about 35%.  
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

- *Clue:* Per the FDE brief, this is 'the single most important question in an FDE's toolkit' — the one you ask before building what the customer literally requested.  
- *Response:* **What is 'What are you trying to accomplish?'**  
- *FDE teaching:* Customers ask for Y when they need X. Surface the real goal before building the literal ask.  
- *Source:* FDE brief Part 3 / Part 8

**$400**  

- *Clue:* In the XY problem, the customer asks for Y but actually needs a solution to THIS — and the FDE builds the answer to this, not the literal request.  
- *Response:* **What is X (the real underlying problem)?**  
- *FDE teaching:* Solving Y instead of X is, per the brief, 'the most common, most expensive mistake.'  
- *Source:* FDE brief Part 3 / Part 5

**$600 **[TRAP]****  

- *Clue:* A CO says 'build me a fuzzy-matching configurable dedup engine.' The FDE who burns two weeks on it instead of running the one-time SQL query the CO needed by Friday has committed THIS anti-pattern.  
- *Response:* **What is overengineering (solving the wrong problem)?**  
- *FDE teaching:* TRAP: the robust, configurable system feels like 'good engineering.' But the customer cared about getting the answer by Friday. Calibrate to the situation.  
- *Source:* FDE brief Part 5 (overengineering)

**$800**  

- *Clue:* Rob Fitzpatrick's method, cited in the FDE brief, for talking to customers so they 'can't lie to you' — by asking about their actual life and workflow, not whether they like your idea.  
- *Response:* **What is The Mom Test?**  
- *FDE teaching:* Ask about their workflow and past behavior, not opinions about your solution. The way you surface X without leading questions.  
- *Source:* FDE brief Part 3

**$1000**  

- *Clue:* The Frontline insight 'become a user before you become a builder' is the antidote to THIS first-month anti-pattern, where a new FDE arrives with strong opinions before understanding the customer's environment.  
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
| $1000 ⚠️TRAP | What is escalate to a Contracting Officer (HITL #2 / fall back to a human)? | W2 Thu war-room (HITL #2) |

**$200**  

- *Clue:* The hard non-functional requirement the OIG imposes on the RAG system — every answer must be traceable and re-derivable to its source.  
- *Response:* **What is reproducibility (auditability / citation grounding)?**  
- *FDE teaching:* OIG reproducibility is the load-bearing NFR. Every clause-quote links back to source chunk + clause-ID + last_revised date.  
- *Source:* W2 Mon / W2 Thu (citation grounding UI)

**$400**  

- *Clue:* The W2 Tue vendor question — 'FAR 15.208(a) says 30 calendar days but DFARS 215.371-4 references different timing, which governs?' — exposes the need to encode THIS rule (per 48 CFR §201.104) as chunk metadata.  
- *Response:* **What is clause precedence (DFARS supplements FAR for DoD acquisitions)?**  
- *FDE teaching:* Dual-source retrieval over FAR alone misses the DFARS supplement; precedence per 48 CFR §201.104 must be encoded, not assumed.  
- *Source:* W2 Tue war-room / pre-session glossary

**$600 **[DAILY DOUBLE]****  

- *Clue:* Atlas's built-in operator (RRF-based) for combining dense $vectorSearch with sparse $search results into one ranked hybrid list.  
- *Response:* **What is $rankFusion (Reciprocal Rank Fusion)?**  
- *FDE teaching:* Hybrid = dense + sparse merged via RRF (score = sum of 1/(k+rank), k=60 default). The W2 Tue hybrid baseline.  
- *Source:* W2 Tue pre-session §3 / glossary

**$800**  

- *Clue:* In W2 Thu, the model cited real clause FAR 47.305-2 (about packaging) when asked about Section M evaluation factors — retrieval pulled the wrong chunk and the reranker promoted it. This RAGAS-style dimension is what dropped.  
- *Response:* **What is faithfulness?**  
- *FDE teaching:* Faithfulness = does the answer stay true to the retrieved context. RAG doesn't auto-fix wrong retrieval; a bad reranker can promote the wrong chunk.  
- *Source:* W2 Thu war-room / W2 Fri eval harness

**$1000 **[TRAP]****  

- *Clue:* When W2 Thu's RAG faithfulness check fails or retrieval confidence drops below threshold, the federal-acquisitions answer is NOT to ship a guess — instead the platform returns a 'needs_human_review' envelope and does THIS.  
- *Response:* **What is escalate to a Contracting Officer (HITL #2 / fall back to a human)?**  
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

- *Clue:* Per the FDE brief, when a CEO demo crashes, the great FDE fixes it in 4 minutes and achieves THIS outcome — the CEO never even knew an engineer was on the phone.  
- *Response:* **What is staying calm in a crisis (crisis composure)?**  
- *FDE teaching:* 'How you handle a crisis matters as much as whether you fix it.' Composure is a deliverable.  
- *Source:* FDE brief Part 2 (trait 4) / Part 8

**$400**  

- *Clue:* The brief insists calm under pressure is THIS, not personality — built by volunteering for on-call, taking the escalation, and joining the war room until you have a playbook in your head.  
- *Response:* **What is preparation?**  
- *FDE teaching:* 'Calm is preparation, not personality.' By the 10th incident you have a playbook. The whole programme's daily war-room is this rehearsal.  
- *Source:* FDE brief Part 3

**$600 **[TRAP]****  

- *Clue:* When a meeting gets tense, the FDE anti-pattern of hiding behind the laptop instead of staying present in the conversation is called THIS.  
- *Response:* **What is retreating into code?**  
- *FDE teaching:* TRAP: 'I'll just go fix it real quick' feels productive but abandons the room. Stay present; the relationship is the work too.  
- *Source:* FDE brief Part 5

**$800**  

- *Clue:* In W2 Wed's incident, re-indexing FAR Part 15 with the new chunking strategy quietly lost the DFARS 215.3xx supplements because of THIS kind of bug — the DFARS files sit one directory deeper.  
- *Response:* **What is a folder-walk (directory traversal) bug?**  
- *FDE teaching:* Silent data loss on re-index. The kind of regression the eval harness is supposed to catch — 'you can't trust the system you've never seen the data for.'  
- *Source:* W2 Wed war-room

**$1000**  

- *Clue:* The brief's Cassandra horror story — an empty date became epoch 1970, spawning 2.3M keyspaces and demanding 14TB of RAM to boot — is the canonical example of THIS anti-pattern.  
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

- *Clue:* Complete the FDE brief's one-sentence core: 'An FDE is a software engineer who owns customer ___.'  
- *Response:* **What are outcomes?**  
- *FDE teaching:* TRAP: 'relationships' or 'satisfaction scores.' Neither — outcomes: the actual results the customer is trying to achieve.  
- *Source:* FDE brief Part 1 / Part 8

**$400**  

- *Clue:* In the Palantir 'Dev vs Delta' framing, a Dev builds one capability for many customers; the FDE (Delta) does THIS instead.  
- *Response:* **What is enable many capabilities for a single customer?**  
- *FDE teaching:* Breadth over a customer, not depth over a feature. The defining shape of the role.  
- *Source:* FDE brief Part 1

**$600**  

- *Clue:* The brief contrasts an output — shipping the PR — with an outcome, given as THIS concrete example involving an analyst's morning.  
- *Response:* **What is the analyst's morning being 45 minutes shorter?**  
- *FDE teaching:* FDEs are measured on the outcome, not the merge. The daily papercut (the 45-min Excel ritual) is what you hunt for on a first site visit.  
- *Source:* FDE brief Part 1 / Part 4

**$800**  

- *Clue:* Per the brief, most enterprise software fails not because it's technically broken but because it never gets THIS — making it the enemy the FDE model exists to defeat.  
- *Response:* **What is adopted (adoption)?**  
- *FDE teaching:* 'Shelfware is the enemy.' Software that gets adopted is worth infinitely more than software that sits on a shelf.  
- *Source:* FDE brief Part 3

**$1000**  

- *Clue:* The brief calls THIS 'the hardest skill' — getting a team that doesn't report to you to act, by explaining the why (revenue, renewal, the customer's own words) rather than the what.  
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

- *Clue:* If your supervisor agent re-invokes Bedrock between every worker step 'to check progress,' turning a 5-call flow into a 30-call flow with no observability win, you've committed THIS anti-pattern.  
- *Response:* **What is the chatty-handoff anti-pattern?**  
- *FDE teaching:* Chatty handoffs explode latency + cost for no value. Each extra LLM hop must earn its place.  
- *Source:* W3 Wed pre-session §2 / glossary

**$800**  

- *Clue:* In W3, when every agent in the multi-agent flow writes its own AuditEvent, the W1 brownfield-debt Item 2 audit-log race becomes catastrophic. The defense: a single audit-writer plus THIS threaded identifier.  
- *Response:* **What is correlation_id (correlation-id threading)?**  
- *FDE teaching:* Audit fan-out multiplies the race from one lost row to many. Single audit-writer + correlation_id. (Item 6 fix, deferred to W5 W3C traceparent.)  
- *Source:* W3 Wed pre-session §9 / glossary

**$1200 **[DAILY DOUBLE]****  

- *Clue:* The W3 Wed reading warns that on Day 3 you should use LangGraph's primitives rather than doing THIS — which is only a scenario-alternative to evaluate, never the path you commit to.  
- *Response:* **What is hand-rolling multi-agent orchestration?**  
- *FDE teaching:* Don't hand-roll the orchestrator. Use the framework primitives; evaluate hand-rolling in an ADR, don't ship it on day 3.  
- *Source:* W3 Wed pre-session §9

**$1600 **[TRAP]****  

- *Clue:* The W3 Wed anti-pattern '_______' — every additional agent multiplies the failure surface, so you must defend each agent's existence — echoes the FDE habit of NOT reaching for multi-agent when ReAct suffices.  
- *Response:* **What is 'just one more agent'?**  
- *FDE teaching:* TRAP: more agents feels more capable. Each agent multiplies failure surface. Single-agent before multi-agent — calibrate engineering to the situation.  
- *Source:* W3 Wed pre-session §9 / FDE brief Part 7

**$2000**  

- *Clue:* The W3 Wed reading warns NOT to put HITL #4 only on the SSA boundary, because that conflates it with HITL #5. HITL #4 actually lives HERE.  
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

- *Clue:* W1 Fri's three-part test for whether an LLM output needs a human gate: reversibility, audit demands, and THIS — does the action affect external parties like awarding a contract or publishing a notice?  
- *Response:* **What is blast radius?**  
- *FDE teaching:* Gate on reversibility + blast radius + audit demands. A search needs no gate; awarding a contract does.  
- *Source:* W1 Thu pre-session §7 / W1 Fri war-room

**$800**  

- *Clue:* The LangGraph parameter the cohort sets to ['ssa_review_ssdd'] to force a human approval before that node executes — the technical anchor of HITL #5.  
- *Response:* **What is interrupt_before?**  
- *FDE teaching:* interrupt_before pauses the graph for human approval at a named node. The mechanism behind the hard gate.  
- *Source:* W3 Thu PLAN / W3 Wed §8

**$1200**  

- *Clue:* Per FAR 15.308, the source selection authority's independent judgment 'shall not be ___' — which is why the SSA-review agent is a HARD interrupt, not a soft one.  
- *Response:* **What is delegated?**  
- *FDE teaching:* The SSA decision authority cannot be delegated — the non-negotiable regulatory justification for the hard human gate. Authority boundary, encoded in the graph.  
- *Source:* W3 Wed pre-session §4 (FAR 15.308)

**$1600 **[TRAP]****  

- *Clue:* A supervisor→evaluator(proposal_N) handoff is reversible (a reviewable read), so it gets a SOFT gate or none; the consensus→SSA-review handoff is irreversible, so it gets THIS kind of gate.  
- *Response:* **What is a hard interrupt (hard HITL gate)?**  
- *FDE teaching:* TRAP: 'gate every handoff for safety' over-engineers and kills throughput. Gate the irreversible boundary; leave reversible reads ungated.  
- *Source:* W3 Wed pre-session §2 / §5 questions

**$2000**  

- *Clue:* The FDE brief reframes HITL touchpoints across the programme as these — the W3 Fri gate defense, convincing the Agency CIO and OIG, is described as a rehearsal of owning them.  
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

- *Clue:* The single-agent reasoning loop — reason, then act with a tool, then observe — that the cohort builds first on POST /agent/intake-triage before reaching for multi-agent shapes.  
- *Response:* **What is ReAct (Reason + Act)?**  
- *FDE teaching:* Single-agent ReAct first (Tue), multi-agent later (Wed). Don't skip the simple loop.  
- *Source:* W3 Tue PLAN

**$800**  

- *Clue:* The default multi-agent shape where one agent decides which worker to call next and when the work is done, while workers do narrow well-defined tasks.  
- *Response:* **What is the supervisor-worker pattern?**  
- *FDE teaching:* Supervisor routes; workers do narrow tasks. evaluator → consensus → SSA-review is the W3 flow.  
- *Source:* W3 Wed pre-session §2

**$1200**  

- *Clue:* For state-mutating agent tools, THIS property — making a repeated call safe to apply only once — is the W3 Tue requirement that read-only inference doesn't need but write tools do.  
- *Response:* **What is idempotency?**  
- *FDE teaching:* Read inference can retry freely; state-mutating tools need idempotency keys so a retried write applies once.  
- *Source:* W3 Tue PLAN

**$1600**  

- *Clue:* The TypedDict (e.g., EvaluationState) that the LangGraph state machine threads through its nodes, designed Thu of W3.  
- *Response:* **What is the state schema (graph state)?**  
- *FDE teaching:* State schema design is the Thu anchor; the typed state is what checkpointing persists.  
- *Source:* W3 Thu PLAN

**$2000 **[DAILY DOUBLE]****  

- *Clue:* The LangGraph persistence mechanism — MemorySaver in dev, PostgresSaver in prod shape — that lets an interrupted graph resume after a human approves at an interrupt_before node.  
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

- *Clue:* The namespace migration Spring Boot 3.x mandates — every import of THIS old package family must become jakarta.* to compile against Spring Framework 6.  
- *Response:* **What is javax.* (javax → jakarta)?**  
- *FDE teaching:* Spring Boot 3.x is the Jakarta EE 9+ generation. The javax→jakarta sweep (OpenRewrite UpgradeSpringBoot_3_5) is the W4 mechanical migration.  
- *Source:* spring-boot-2-7-to-3-x research brief

**$800**  

- *Clue:* AWS SDK for Java 1.x hit THIS lifecycle milestone on 31 Dec 2025 — meaning acquire-gov ships with an AWS SDK that gets no more patches and no support for newly-released Bedrock models.  
- *Response:* **What is end-of-support (EOS)?**  
- *FDE teaching:* v1 (com.amazonaws.*) is EOS since 31 Dec 2025. The 'v1 still works so we can wait' answer is a procurement red flag in a federal context.  
- *Source:* aws-sdk-v1-to-v2 research brief

**$1200**  

- *Clue:* The automated tooling — used for both the AWS SDK v1→v2 sweep and the Spring Boot upgrade — that mechanically rewrites ~70–80% of imports and calls via recipes.  
- *Response:* **What is OpenRewrite (recipe-based migration tooling)?**  
- *FDE teaching:* OpenRewrite recipes (UpgradeSpringBoot_3_5, UpgradeToJava17) do the mechanical bulk; the remaining 20–30% is manual. AWS ships an OpenRewrite-style runner too.  
- *Source:* both research briefs

**$1600 **[TRAP]****  

- *Clue:* Spring's explicit guidance is that you can NOT jump 2.7 → 4.0 in one PR; you must do THIS intermediate hop first.  
- *Response:* **What is upgrade to 3.5 (3.x) first, then to 4.0?**  
- *FDE teaching:* TRAP: 'big-bang upgrade straight to 4.0' is tempting and explicitly wrong. acquire-gov stops at 3.5.x for the cohort; 4.0 is the 'what's next' ADR.  
- *Source:* spring-boot research brief §3 misconceptions

**$2000**  

- *Clue:* The incremental migration playbook for AWS SDK v1→v2 — add v2 alongside v1 (no Maven conflict, different groupId), migrate one client at a time leaf-first, and remove v1 only when the last com.amazonaws import is gone — is named after THIS tree-killing pattern.  
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

- *Clue:* FDE trait 2 says to know when to build a robust system versus when to just write a script that works — because both of THESE are failures that leave scars.  
- *Response:* **What are over-engineering and under-engineering?**  
- *FDE teaching:* Calibrate engineering to the situation. Both directions are failures. The 'configurable dedup engine vs the Friday SQL query' lives here.  
- *Source:* FDE brief Part 2 (trait 2)

**$800**  

- *Clue:* Treating the W1 system prompt as THIS — an architectural artifact with named sections, version control, and tests — rather than a string literal buried in code.  
- *Response:* **What is code (treat the prompt as code)?**  
- *FDE teaching:* Context engineering: prompts live in version control, have tests, are ADR-worthy. Static persona/constraints separated from dynamic RAG context.  
- *Source:* W1 Thu pre-session §3

**$1200**  

- *Clue:* In W1 Fri's structured output work, the cohort uses THIS Python library in strict mode (extra='forbid') to validate the Bedrock response BEFORE it leaves the AI service.  
- *Response:* **What is Pydantic?**  
- *FDE teaching:* Pydantic strict-mode on the Python side + Bean Validation on the Spring side = defense in depth. The two schemas must agree or Codex flags the drift.  
- *Source:* W1 Thu pre-session §1–2

**$1600 **[TRAP]****  

- *Clue:* In LangChain v1.0 the Chain class is removed and chain.run() won't work, so sequential composition is done with THIS — 'no framework magic.'  
- *Response:* **What are plain Python function calls?**  
- *FDE teaching:* TRAP: writing prompt | model | parser LCEL pipes as the foundation, or RetrievalQA.from_chain_type(...).run(). Both are deprecated v0.x patterns (brownfield Item 5).  
- *Source:* W1 Fri pre-session §3 / known-bad-patterns

**$2000**  

- *Clue:* Choosing Bedrock Titan Embeddings v2 at 256 dims instead of 1024 trades accuracy for lower cost and latency — a calibration choice. Titan v2 also returns THESE, so cosine and dot-product agree and you avoid the vector-cosine-default trap.  
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

- *Clue:* FDE trait 3 — speaking the same problem in different language for the CTO versus the eng lead — summarized by the brief's one-page test: 'If you can't explain it in one page without ___, you don't understand it.'  
- *Response:* **What is jargon?**  
- *FDE teaching:* Communicate across audiences. The W3 Fri defense is tier-aware: CIO Q&A vs OIG Q&A vs architecture defense — same system, three languages.  
- *Source:* FDE brief Part 2 (trait 3) / Part 7

**$800**  

- *Clue:* The brief's metaphor for how a technical message degrades each time it passes through another person — which FDEs short-circuit by being in the room.  
- *Response:* **What is the telephone game?**  
- *FDE teaching:* Every hop degrades the message. Be in the room. The opposite of 'throwing it over the wall.'  
- *Source:* FDE brief Part 3

**$1200 **[TRAP]****  

- *Clue:* FDE trait 6 says don't just do whatever the customer asks — but the right way to disagree is to push back WITH this, not with a flat no.  
- *Response:* **What is an alternative (push back with an alternative)?**  
- *FDE teaching:* TRAP: 'the customer is always right, just build it' OR 'just say no.' Neither. Understand the real need, then offer an alternative.  
- *Source:* FDE brief Part 2 (trait 6) / Part 8

**$1600**  

- *Clue:* The old delivery model the FDE model exists to CORRECT — ship it, let the customer or SI figure it out, and blame them when it fails.  
- *Response:* **What is throwing it over the wall?**  
- *FDE teaching:* The FDE model is the correction to 'throw it over the wall.' AI makes this worse: you can't throw an LLM over the wall and expect customers to figure it out.  
- *Source:* FDE brief Part 5 / Part 6

**$2000**  

- *Clue:* The brief's scheduling principle that builds CIO trust — phrased as 'Done Wednesday, finished Tuesday beats Done Monday, finished Wednesday.'  
- *Response:* **What is underpromise and overdeliver?**  
- *FDE teaching:* Overpromising ('Done Monday' then delivering Wednesday) destroys trust. Credibility is points you can spend.  
- *Source:* FDE brief Part 3 / Part 5


---

# Final Jeopardy

**Category:** FIELD NOTES — THE FDE JUDGMENT CALL

**Clue:** At the W3 Friday Mid-Program Gate, the Agency CIO says: 'Just have the AI auto-approve the routine evaluation scores and award decisions — your faithfulness numbers look great and my staff are slammed. Ship full autonomy Monday.' Per the FDE mindset AND FAR 15.308, name the single move that is BOTH the right technical answer and the right FDE answer.

**Correct response:** **What is push back with an alternative — keep the human (SSA) hard-gate on the irreversible award decision (it cannot be delegated), while showing where autonomy IS safe (reversible reads / low-blast-radius steps)?**

**FDE teaching / adjudication:** This is the whole programme in one question. The trap is agreeing (the customer asked, the metrics look good) OR flatly refusing. The FDE move: understand the real need (overloaded staff = X), don't deliver the literal ask (full autonomy = Y), push back WITH an alternative grounded in FAR 15.308 (SSA authority can't be delegated) + HITL gating logic (gate the irreversible/high-blast-radius award; automate the reversible reads). Calibrate engineering to the situation, own the outcome, defend it across audiences. Good metrics never override a non-delegable authority boundary.

**Source:** FDE brief Parts 2/3/5 + W3 FAR 15.308 + W1 Fri HITL test

