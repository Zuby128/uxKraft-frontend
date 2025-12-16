import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";

type TimelineState = {
  logistics: {
    orderedDate?: Date | null;
    shippedDate?: Date | null;
    deliveredDate?: Date | null;
    shippingNotes?: string;
  };
  planning: {
    poApprovalDate?: Date | null;
    hotelNeedByDate?: Date | null;
    expectedDelivery?: Date | null;
  };
  production: {
    cfaShopsSend?: Date | null;
    cfaShopsApproved?: Date | null;
    cfaShopsDelivered?: Date | null;
  };
};

type UpdateFieldPayload = {
  section: keyof TimelineState;
  field: string;
  value: any;
};

type TimelineContextValue = {
  state: TimelineState;

  /** 🔹 form input’ları için */
  updateField: (payload: UpdateFieldPayload) => void;

  /** 🔹 sidebar save için */
  getState: () => TimelineState;

  reset: () => void;
};

const defaultState: TimelineState = {
  logistics: {},
  planning: {},
  production: {},
};

const TimelineContext = createContext<TimelineContextValue | null>(null);

export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<TimelineState>(defaultState);

  /** 🔥 latest snapshot */
  const stateRef = useRef(state);
  stateRef.current = state;

  const getState = useCallback(() => stateRef.current, []);

  const updateField = useCallback(
    ({ section, field, value }: UpdateFieldPayload) => {
      setState((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    },
    []
  );

  const reset = () => {
    setState(defaultState);
  };

  return (
    <TimelineContext.Provider
      value={{
        state,
        updateField,
        getState,
        reset,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const ctx = useContext(TimelineContext);
  if (!ctx) {
    throw new Error("useTimeline must be used within TimelineProvider");
  }
  return ctx;
};
