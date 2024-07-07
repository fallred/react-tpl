
let state = {
    a:{
        b:{
            c:{
                d:{
                    age:10
                }
            }
        }
    }
}

return {
    ...state,
    a:{
        ...state.a,
        b:{
            ...state.a.b,
        }
    }
}
state.a.b.c.d.age = 11;