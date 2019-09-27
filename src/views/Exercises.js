
import React from 'react'
import styled from 'styled-components'

import ProofContainer from '../userInterface/ProofContainer'

import { Page } from '../styles'


const Exercises = props => {
    return (
        <Page>
            {exerciseData.map( (e, idx) => <ProofContainer key={idx} {...e} />)}
        </Page>
    );
}



const exerciseData = [
    {logic: "Propositional",
    name: "Direct Proofs",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '→ Elimination'
    ],
    proofs: [
        {premises: [
            {type:"conjunction", left:{type:"atom", letter:"A"}, right: {type: "conditional", left: {type: "atom", letter: "A"}, right: {type: "atom", letter: "B"}}}
        ], conclusion:
            {type:"conjunction", left:{type:"atom", letter:"A"}, right:{type:"atom", letter: "B"}}
        },

        {premises: [
            {type: "conditional", left: {type: "atom", letter: "A"}, right: {type: "atom", letter: "B"}},
            {type: "conditional", left: {type: "conjunction", left: {type: "atom", letter: "B"}, right: {type: "atom", letter: "C"}}, right: {type: "atom", letter: "D"}},
            {type: "conjunction", left: {type: "atom", letter: "A"}, right: {type: "atom", letter: "C"}}
        ],conclusion:
            {type: "atom", letter: "D"}
        },

        {premises: [
            {type: "atom", letter: "A"},
            {type: "conditional", left: {type:"disjunction", left: {type: "atom", letter: "C"}, right: {type: "atom", letter: "A"}}, right: {type: "atom", letter: "B"}}
        ],conclusion:
            {type:"disjunction", left: {type: "atom", letter: "B"}, right: {type: "atom", letter: "D"}}
        },

        {premises: [
            {type: "conditional", left: {type: "atom", letter: "A"}, right:{type: "conditional", left: {type: "atom", letter: "B"}, right: {type: "atom", letter: "C"}}},
            {type: "conjunction", left: {type: "atom", letter: "B"}, right: {type: "atom", letter: "A"}}
        ],conclusion:
            {type: "disjunction", left: {type: "atom", letter: "D"}, right: {type: "conjunction", left: {type: "atom", letter: "C"}, right: {type: "atom", letter: "A"}}}
        },

        {premises: [
            {type:"conjunction", left: {type:"atom", letter:"B"}, right: {type:"atom", letter:"C"}},
            {type:"conditional", left: {type:"disjunction", left:{type:"atom", letter:"D"}, right:{type:"atom", letter:"C"}}, right: {type:"atom", letter:"A"}}
        ], conclusion:
            {type:"conjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}}
        }
    
    ]},

    {logic: "Propositional",
    name: "Conditional Proofs",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '→ Introduction',
        '→ Elimination',
        
    ],
    proofs: [
        {premises: [
            {type:"conditional", left: {type:"disjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}}, right: {type:"atom", letter:"C"}}
        ],conclusion:
            {type:"conditional", left: {type:"atom", letter:"B"}, right: {type:"atom", letter:"C"}}
        },

        {premises: [
            {type:"conditional", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"C"}}
        ],conclusion:
            {type:"conditional", left: {type: "conjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}}, right: {type:"atom", letter:"C"}}
        },

        {premises: [
            {type:"conditional", left: {type:"atom", letter:"A"} , right: {type:"conditional", left: {type:"atom", letter:"B"} , right: {type:"atom", letter:"C"}}}
        ],conclusion:
            {type:"conditional", left: {type:"conjunction", left:{type:"atom", letter:"A"}, right:{type:"atom", letter:"B"}}, right: {type:"atom", letter:"C"}}
        },

        {premises: [
            {type:"conditional", left: {type:"conjunction", left:{type:"atom", letter:"A"}, right:{type:"atom", letter:"B"}}, right: {type:"atom", letter:"C"}}
        ], conclusion:
            {type:"conditional", left: {type:"atom", letter:"A"} , right: {type:"conditional", left: {type:"atom", letter:"B"} , right: {type:"atom", letter:"C"}}}
        },

        {premises: [
            {type: "conditional", left: {type: "conditional", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}}, right: {type:"atom", letter:"C"}},
            {type: "conditional", left: {type: "conjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"D"}} , right: {type:"atom", letter:"B"}}
        ],conclusion:
            {type: "conditional", left:{type:"atom", letter:"D"}, right: {type:"atom", letter:"C"}}
        },
    ]},

    {logic: "Propositional",
    name: "Proofs by Cases",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '∨ Elimination',
        '→ Elimination'
    ],
    proofs: [
        {premises: [
            {type:"disjunction", left: {type:"conjunction", left:{type:"atom", letter:"A"}, right:{type:"atom", letter:"B"}}, right: {type:"conjunction", left:{type:"atom", letter:"C"}, right:{type:"atom", letter:"D"}}}
        ], conclusion:
            {type:"disjunction", left: {type:"atom", letter:"A"} , right: {type:"atom", letter:"D"}}
        },

        {premises: [
            {type: "disjunction", left: {type: "atom", letter:"A"}, right: {type: "atom", letter:"B"}},
            {type: "conditional", left: {type: "atom", letter:"A"}, right: {type: "atom", letter:"C"}},
            {type: "conditional", left: {type: "atom", letter:"B"}, right: {type: "atom", letter:"C"}}
        ],conclusion:
            {type: "atom", letter:"C"}
        },

        {premises: [
            {type: "atom", letter:"A"},
            {type: "disjunction", left: {type: "conditional", left: {type: "atom", letter:"A"}, right: {type: "atom", letter:"B"}}, right: {type: "conditional", left: {type: "atom", letter:"A"}, right: {type: "atom", letter:"C"}}}  
        ],conclusion:
            {type: "disjunction", left: {type: "atom", letter:"B"}, right: {type: "atom", letter:"C"}}},

        {premises: [
            {type: "disjunction", left: {type: "atom", letter:"A"}, right: {type: "disjunction", left: {type: "atom", letter:"B"}, right: {type: "atom", letter:"C"}}}
        ],conclusion:
        {type: "disjunction", left: {type: "disjunction", left: {type: "atom", letter:"A"}, right: {type: "atom", letter:"B"}}, right: {type: "atom", letter:"C"}}
        },

        {premises: [
            {type:"conditional", left: {type:"atom", letter: "B"} , right: {type:"atom", letter: "A"}},
            {type:"conditional", left: {type:"atom", letter: "C"} , right: {type:"atom", letter: "A"}},
            {type:"disjunction", left: {type:"atom", letter: "C"} , right: {type:"atom", letter: "B"}}
        ],conclusion:
        {type: "disjunction", left: {type: "conjunction", left: {type: "atom", letter:"A"}, right: {type: "atom", letter:"B"}}, right: {type: "conjunction", left: {type: "atom", letter:"A"}, right: {type: "atom", letter:"C"}}}
        },
    ]},

    {logic: "Propositional",
    name: "Proofs by Contradiction",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '→ Elimination',
        '¬ Introduction',
        '¬ Elimination'
    ],
    proofs: [
        {premises: [
            {type: "atom", letter:"A"}
        ],conclusion:
            {type:"negation", right: {type:"negation", right: {type: "atom", letter:"A"}}}
        },

        {premises: [
            {type:"negation", right: {type:"disjunction", left: {type:"atom", letter:"A"} , right: {type:"atom", letter:"B"}}}
        ], conclusion:
            {type:"conjunction", left: {type:"negation", right: {type:"atom", letter:"A"}} , right: {type:"negation", right: {type:"atom", letter:"B"}}}
        },

        {premises: [
            {type: "conditional", left: {type:"atom", letter:"A"}, right: {type:"negation", right: {type:"atom", letter:"B"} } }
        ],conclusion:
            {type:"negation", right: {type:"conjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}}}
        },

        {premises: [
            {type:"conjunction", left: {type:"negation", right: {type:"atom", letter:"A"}} , right: {type:"negation", right: {type:"atom", letter:"B"}}}
        ],conclusion:
            {type:"negation", right: {type:"disjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}}}
        },

        {premises: [
            {type: "conjunction", left: {type:"negation", right:{type:"atom", letter:"C"}}, right: {type:"atom", letter:"A"}}
        ],conclusion:
            {type:"negation", right: {type:"conditional", left: {type:"atom", letter:"A"}, right: {type:"conjunction", left: {type:"atom", letter:"B"}, right: {type:"atom", letter:"C"}}}}
        },
    ]},

    {logic: "Propositional",
    name: "Challenge Proofs",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '∨ Elimination',
        '→ Introduction',
        '→ Elimination',
        '¬ Introduction',
        '¬ Elimination',
        'Reiteration',
        'Explosion',
        'Double Negation Elimination',
    ],
    proofs: [
        {premises: [
            {type:"disjunction", left: {type:"atom", letter:"A"} , right: {type:"atom", letter:"B"}}
        ], conclusion:
            {type:"conditional", left: {type:"negation", right: {type:"atom", letter:"A"}} , right: {type:"atom", letter:"B"}}
        },
        {premises: [

        ],conclusion:
            {type:"disjunction", left: {type:"atom", letter:"A"} , right: {type:"negation", right: {type:"atom", letter:"A"}}}
        },
        {premises: [
            {type:"negation", right:{type:"conjunction", left: {type:"atom", letter:"A"}, right: {type:"atom", letter:"B"}}}
        ],conclusion:
            {type:"disjunction", left: {type:"negation", right: {type:"atom", letter:"A"}}, right: {type:"negation", right: {type:"atom", letter:"B"}}}
        },
        {premises: [
            {type: 'atom', letter: 'A'},
            {type:"negation", right: {type: "conjunction", left: {type: 'atom', letter: 'B'}, right: {type: 'atom', letter: 'C'}}}
        ],conclusion:
            {type:"disjunction", left: {type:"negation", right: {type:"conditional", left: {type: 'atom', letter: 'A'}, right: {type: 'atom', letter: 'B'}}}
            , right: {type:"negation", right: {type:"conditional", left: {type: 'atom', letter: 'B'}, right: {type: 'atom', letter: 'C'}}}
        }
        },
        {premises: [

        ],conclusion:
               {type:"conditional", left: {type:"conditional", left: {type: "conditional", left: {type:"atom", letter:"A"} , right: {type:"atom", letter:"B"}}, right: {type:"atom", letter:"A"}}, right: {type:"atom", letter:"A"}}
        },
    ]},

    {logic: "Predicate",
    name: "Direct Proofs",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '→ Elimination',
        '∃ Introduction',
        '∀ Elimination'
    ],
    proofs: [
        {premises: [
            {type:"universal", variable: 2, right: {type:"atom", predicate: "A", terms:[2]}}
        ], conclusion:
            {type:"atom", predicate:"A", terms:["b"]}
        },

        {premises: [
            {type:"atom", predicate:"A", terms:["b"]}
        ], conclusion:
            {type:"existential", variable: 1, right: {type:"atom", predicate: "A", terms:[1]}}
        },

        {premises: [
            {type:"universal", variable: 2, right: {type:"conditional", left: {type:"atom", predicate: "A", terms:[2]} , right: {type:"atom", predicate: "B", terms:[2]} }},
            {type:"atom", predicate: "A", terms:['c']}
        ],conclusion:
            {type:"existential", variable: 1, right: {type:"atom", predicate: "B", terms:[1]}}
        },

        {premises: [
            {type:"conjunction", left: {type:"universal", variable: 1, right: {type:"atom", predicate: "A", terms:[1]}}, right: {type:"universal", variable: 1, right: {type:"atom", predicate: "B", terms:[1]}}}
        ],conclusion:
            {type:"existential", variable: 1, right: {type:"conjunction", left: {type:"atom", predicate: "A", terms:[1]}, right: {type:"atom", predicate: "B", terms:[1]}}}
        },

        {premises: [
            {type:"atom", predicate: "A", terms:["c"]},
            {type:"conditional", left: {type:"existential", variable: 1, right: {type:"atom", predicate: "A", terms:[1]}} ,right: {type:"universal", variable: 1, right: {type:"atom", predicate: "B", terms:[1]}}}
            
        ],conclusion:
            {type:"atom", predicate: "B", terms:["d"]}
        },

    ]},

    {logic: "Predicate",
    name: "Universal Proofs",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '∨ Elimination',
        '→ Introduction',
        '→ Elimination',
        '¬ Introduction',
        '¬ Elimination',
        '∃ Introduction',
        '∀ Introduction',
        '∀ Elimination',
    ],
    proofs: [
        {premises: [
            {type:"universal", variable: 2, right: {type:"conjunction", left: {type:"atom", predicate: "A", terms:[2]}, right: {type:"atom", predicate: "B", terms:[2]}}}
        ], conclusion:
            {type:"universal", variable: 2, right: {type:"atom", predicate: "A", terms:[2]}}
        },
        {premises: [
            {type: "universal", variable: 1, right: {type:"conditional", left: {type:"atom", predicate: "P", terms:[1]} , right: {type:"atom", predicate: "Q", terms:[1]}}},
            {type: "universal", variable: 1, right: {type:"conditional", left: {type:"atom", predicate: "Q", terms:[1]} , right: {type:"atom", predicate: "R", terms:[1]}}}
        ],conclusion:
            {type: "universal", variable: 1, right: {type:"conditional", left: {type:"atom", predicate: "P", terms:[1]} , right: {type:"atom", predicate: "R", terms:[1]}}}
        },
        {premises: [
            {type: "disjunction", left: {type: "negation", right: {type:"atom", predicate: "P", terms:['a']} }, right: {type: "negation", right: {type:"atom", predicate: "Q", terms:['b']} }}
        ],conclusion:
            {type:"negation", right: {type:"universal", variable: 1, right: {type:"conjunction", left: {type:"atom", predicate: "P", terms:[1]}, right: {type:"atom", predicate: "Q", terms:[1]}      }}}
        },
        {premises: [
            {type:"universal", variable: 1, right: {type:"conjunction", left: {type:"atom", predicate: "A", terms:[1]}, right: {type:"atom", predicate: "B", terms:[1]}}},
        ],conclusion:
            {type:"universal", variable: 1, right: {type:"conditional", left: {type:"atom", predicate: "A", terms:[1]}, right: {type:"atom", predicate: "B", terms:[1]}}}
        },
        {premises: [
            {type:"universal", variable: 1, right: {type:"conditional", left: {type:"atom", predicate: "A", terms:[1]}, right: {type:"atom", predicate: "B", terms:[1]}}}
        ],conclusion:
            {type:"conditional", left: {type:"universal", variable: 1, right: {type:"atom", predicate: "A", terms:[1]}} , right: {type:"universal", variable: 1, right: {type:"atom", predicate: "B", terms:[1]}} }
        },
    ]},

    {logic: "Predicate",
    name: "Existential Proofs",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '∨ Elimination',
        '→ Introduction',
        '→ Elimination',
        '¬ Introduction',
        '¬ Elimination',
        '∃ Introduction',
        '∃ Elimination',
        '∀ Elimination'
    ],
    proofs: [
        {premises: [
            {type:"existential", variable: 1, right: {type:"atom", predicate: "A", terms:[1]}}
        ], conclusion:
            {type:"existential", variable: 1, right: {type:"disjunction", left: {type:"atom", predicate: "A", terms:[1]}, right: {type:"atom", predicate: "B", terms:[1]}}}
        },
        {premises: [
            {type:"existential", variable: 1, right: {type:"disjunction", left: {type:"atom", predicate: "A", terms:[1]}, right: {type:"atom", predicate: "B", terms:[1]}}}
        ],conclusion:
            {type: "disjunction", left: {type:"existential", variable: 1, right: {type:"atom", predicate: "A", terms:[1]}}, right: {type:"existential", variable: 1, right: {type:"atom", predicate: "B", terms:[1]}}}
        },
        {premises: [
            {type:"existential", variable: 1, right: {type:"atom", predicate: "A", terms:[1]}},
            {type:"negation", right:{type:"existential", variable: 1, right: {type:"atom", predicate: "B", terms:[1]}}}
        ],conclusion:
            {type:"existential", variable: 1, right: {type:"conjunction", left: {type:"atom", predicate: "A", terms:[1]} , right: {type:"negation", right:{type:"atom", predicate: "B", terms:[1]}}}}
        },
        {premises: [

        ],conclusion:
            {type: "universal", variable: 1, right: {type:"disjunction", left: {type: "atom", predicate: "P", terms:[1]}, right: {type: "negation", right: {type: "atom", predicate: "P", terms:[1]}} }}
        },
        
        {premises: [
            {type:"existential", variable: 1, right: {type:"atom", predicate: "P", terms:[1]}},
            {type: "universal", variable: 1, right: {type:"conditional", left: {type: "atom", predicate: "P", terms: [1]}, right: {type: "atom", predicate: "Q", terms: [1]}}}
        ],conclusion:
            {type:"existential", variable: 1, right: {type:"conjunction", left: {type:"atom", predicate: "P", terms:[1]}, right: {type:"atom", predicate: "Q", terms:[1]}}},
        },
        {premises: [
            {type:"universal", variable: 1, right:{type:"conditional", left: {type: "atom", predicate: "P", terms: [1]}, right: {type: "atom", predicate: "Q", terms: [1]}}}
        ],conclusion:
            {type:"negation", right: {type:"existential", variable: 1, right: {type:"conjunction", left: {type:"atom", predicate: "P", terms:[1]}, right: {type:"negation", right: {type:"atom", predicate: "Q", terms:[1]}}}}}
        },

        
    ]},

    {logic: "Predicate",
    name: "Challenge Proofs",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '∨ Elimination',
        '→ Introduction',
        '→ Elimination',
        '¬ Introduction',
        '¬ Elimination',
        '∃ Introduction',
        '∃ Elimination',
        '∀ Introduction',
        '∀ Elimination',
        'Reiteration',
        'Explosion',
        'Double Negation Elimination',
    ],
    proofs: [
        {premises: [
            {type: "universal", variable: 1, right: {type:"conditional", left: {type: "atom", predicate: "P", terms: [1]}, right: {type: "atom", predicate: "Q", terms: [1]}}}
        ],conclusion:
            {type:"disjunction", left: {type: "negation", right: {type:"existential", variable: 1, right: {type:"atom", predicate: "P", terms:[1]}}} , right: {type:"existential", variable: 1, right: {type:"atom", predicate: "Q", terms:[1]}}}
        },
        {premises: [
            {type: "negation", right: {type: "existential", variable: 1 , right: {type:"negation", right: {type:"atom", predicate:"P", terms: [1]}}}}
        ],conclusion:
            {type: "universal", variable: 1, right: {type: "atom", predicate: "P", terms:[1]}}
        },
        {premises: [
            {type: "negation", right: {type: "universal", variable: 1 , right: {type:"negation", right: {type:"atom", predicate:"P", terms: [1]}}}}
        ],conclusion:
            {type: "existential", variable: 1, right: {type: "atom", predicate: "P", terms:[1]}}
        },
        
        {premises: [

        ],conclusion:
            {type: "existential", variable: 1, right: {type:"conditional", left: {type:"atom", predicate:"D", terms:[1]} , right:{type:"universal", variable: 2, right: {type:"atom", predicate:"D", terms:[2]}}}}
        },
    ]},

    {logic: "Relational",
    name: "Direct Proofs",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '→ Elimination',
        '∃ Introduction',
        '∀ Elimination'
    ],
    proofs: [
        {premises: [
            {type: "universal", variable: 1, right: {type:"universal", variable: 2, right: {type:"conditional", left: {type:"atom", predicate:"R", terms:[1, "a"]}, right: {type:"atom", predicate:"R", terms:[1, 2]}}}},
            {type:"atom", predicate:"R", terms:["b", "a"]}
        ],conclusion:
            {type:"atom", predicate:"R", terms:["b", "c"]}
        },
        {premises: [
            {type: "universal", variable: 1, right: {type:"universal", variable: 2, right: {type:"conditional", left: {type:"atom", predicate:"R", terms:[1, 2]} , right: {type:"atom", predicate:"R", terms:[2, 1]}}}},
            {type:"atom", predicate:"R", terms:["a", "b"]}
        ],conclusion:
            {type: "existential", variable: 1, right: {type:"atom", predicate:"R", terms:["b", 1]}}
        },
        {premises: [
            {type:"universal", variable: 1, right: {type: "atom", predicate: "R", terms: [1, "b"]}}
        ],conclusion:
            {type: "existential", variable: 1, right: {type: "disjunction", left: {type:"atom", predicate:"R", terms:[1, "a"]}, right: {type:"atom", predicate:"R", terms:["a", 1]}}}
        },
    ]},

    {logic: "Relational",
    name: "Challenge Proofs",
    rules: [
        '& Introduction',
        '& Elimination',
        '∨ Introduction',
        '∨ Elimination',
        '→ Introduction',
        '→ Elimination',
        '¬ Introduction',
        '¬ Elimination',
        '∃ Introduction',
        '∃ Elimination',
        '∀ Introduction',
        '∀ Elimination',
        'Reiteration',
        'Explosion',
        'Double Negation Elimination',
    ],
    proofs: [
        {premises: [
            {type: "universal", variable: 1, right: {type:"universal", variable: 2, right: {type:"conditional", left: {type:"atom", predicate:"R", terms:[1, 2]} , right: {type:"atom", predicate:"R", terms:[2, 1]}}}},
            {type: "universal", variable: 1, right: {type:"universal", variable: 2, right: {type:"universal", variable: 3 , right: {type: "conditional", left: {type: "conjunction", left: {type:"atom", predicate:"R", terms:[1, 2]}, right: {type:"atom", predicate:"R", terms:[2, 3]}} , right: {type:"atom", predicate:"R", terms:[1, 3]}}}}}
        ],conclusion:
            {type: "universal", variable: 1, right: {type:"atom", predicate:"R", terms:[1, 1]}}
        },
        {premises: [
            {type: "existential", variable: 1, right: {type: "universal", variable: 2, right: {type:"atom", predicate: "R", terms: [1, 2]}}}
        ],conclusion:
            {type: "universal", variable: 1, right: {type: "existential", variable: 2, right: {type:"atom", predicate: "R", terms: [2, 1]}}}
        },
        {premises: [
            {type: "universal", variable: 1, right: {type:"conditional", left: {type:"existential", variable: 2, right:{type:"atom", predicate:"R", terms:[1, 2]}} , right: {type:"atom", predicate:"R", terms:["a", 1]}}},
            {type:"negation", right: {type:"existential", variable: 1, right: {type: "conjunction", left: {type:"atom", predicate:"P", terms:[1]} , right: {type:"existential", variable: 2, right: {type:"atom", predicate:"R", terms:[2, 1]}} }}}
        ],conclusion:
            {type: "universal", variable: 1, right: {type:"conditional", left: {type:"atom", predicate: "P", terms:[1]} , right: {type: "negation", right:{type:"existential", variable: 2, right: {type:"atom", predicate:"R", terms:[1, 2]}}}}}
        },
    ]},
    
]


export default Exercises





