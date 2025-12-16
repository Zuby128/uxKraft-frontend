import { createContext, useContext, useReducer, type ReactNode } from "react";

type TimelineState = {
  planning: {
    poApprovalDate: Date | null;
    hotelNeedByDate: Date | null;
    expectedDelivery: Date | null;
  };
  production: {
    cfaShopsSend: Date | null;
    cfaShopsApproved: Date | null;
    cfaShopsDelivered: Date | null;
  };
  logistics: {
    orderedDate: Date | null;
    shippedDate: Date | null;
    deliveredDate: Date | null;
    shippingNotes: string;
  };
};

const initialState: TimelineState = {
  planning: {
    poApprovalDate: null,
    hotelNeedByDate: null,
    expectedDelivery: null,
  },
  production: {
    cfaShopsSend: null,
    cfaShopsApproved: null,
    cfaShopsDelivered: null,
  },
  logistics: {
    orderedDate: null,
    shippedDate: null,
    deliveredDate: null,
    shippingNotes: "",
  },
};

type Action =
  | {
      type: "UPDATE_FIELD";
      payload: {
        section: keyof TimelineState;
        field: string;
        value: any;
      };
    }
  | { type: "RESET" };

function reducer(state: TimelineState, action: Action): TimelineState {
  switch (action.type) {
    case "UPDATE_FIELD": {
      const { section, field, value } = action.payload;

      return {
        ...state,
        [section]: {
          ...state[section],
          [field]: value,
        },
      };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

type ContextValue = {
  state: TimelineState;
  updateField: (
    section: keyof TimelineState,
    field: string,
    value: any
  ) => void;
  reset: () => void;
};

const TimelineContext = createContext<ContextValue | null>(null);

export function TimelineProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateField = (
    section: keyof TimelineState,
    field: string,
    value: any
  ) => {
    dispatch({
      type: "UPDATE_FIELD",
      payload: { section, field, value },
    });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <TimelineContext.Provider
      value={{
        state,
        updateField,
        reset,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("useTimeline must be used inside TimelineProvider");
  }

  return context;
}
