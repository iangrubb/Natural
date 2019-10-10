# Natural

A virtual tutor for natural deduction proofs.

## Motivation

For students in their first course in formal logic, the hardest challenge is often the construcion of natural deduction proofs. The challenge is twofold: the syntax involved in natural deduction proof rules can be intimidating and the strategy required for combining these rules in the right way can be initially unintuitive. Unfortunately, many students get hung up on the syntax, so they don't get a chance to develop an understanding of the strategy involved in proof construction or an appreciation of what natural deduction proofs are all about.

Natural is a proof-construction program that handles the syntax so that students can focus on proof-construction strategies. Students respond to prompts in order to tell the program what they want to add to the proof at any given stage in proof construction, and then the program takes care of the syntactical details involved in implementing the requested additions. The remaining challenge for students is to request the right additions in the right order so that they can successfuly complete the proof.


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
