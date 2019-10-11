# Natural

A virtual tutor for natural deduction proofs.

## Motivation

In introductory courses on formal logic, the hardest challenge that many students face is the construction of natural deduction proofs. The challenge is twofold: the syntax involved in natural deduction proof rules can be intimidating and the strategy required for combining these rules in the right way can be initially unintuitive. Unfortunately, many students get hung up on the syntax, and so don't get a chance to develop an understanding of the strategy involved in proof construction.

Natural is a proof-construction program that handles proof syntax so that students can focus on proof-construction strategies. Students respond to prompts to tell the program what they want to add to a proof-in-progress, and the program manages the syntactical details involved in implementing the requested additions. The challenge for students is requesting the right additions in the right order so that they can successfully complete the proof.

Natural's UI is designed so that, at any stage in proof construction, students are only presented with options that could feasibly be ways of continuing the proof. Students are not give a long list of rules to choose from as they construct a proof. Rather, they can select a sentence that has already been established or is the current proof goal, and the appropriate rule will be automatically selected based on the content and position of the sentence. Moreover, the program doesn't require students to type in sentences in order to add them to a proof. Instead, new sentences are typically copied from the parts of sentences found elsewhere in the proof.


## Features

* Full support for constructing proofs in propositional or predicate logic.
* Collection of practice proofs to choose from, organized by difficulty and required rules.
* Proof submission form for starting new proofs.
* User accounts to save submitted proofs and track successful proof completion.

## Tech

* React
* Redux
* Redux Thunk
* React Router
* Styled Components
* React Reveal
* Rails API Back End ([repo](https://github.com/iangrubb/natural_api))
