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
  bulkEdit: {
    location?: string;
    categoryId?: number | null;
    shipFrom?: string;
    notes?: string;
  };
};

type UpdateFieldPayload = {
  section: keyof TimelineState;
  field: string;
  value: any;
};

type TimelineContextValue = {
  state: TimelineState;
  updateField: (payload: UpdateFieldPayload) => void;
  getState: () => TimelineState;
  reset: () => void;
};

const defaultState: TimelineState = {
  logistics: {
    orderedDate: null,
    shippedDate: null,
    deliveredDate: null,
    shippingNotes: "",
  },
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
  bulkEdit: {
    location: "",
    categoryId: null,
    shipFrom: "",
    notes: "",
  },
};

const TimelineContext = createContext<TimelineContextValue | null>(null);

export const TimelineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<TimelineState>(defaultState);

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

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

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
