import { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData extends { orderItemId: number }> {
  columns: {
    key: keyof TData;
    header: string;
    render?: (row: TData) => React.ReactNode;
  }[];
  data: TData[];
  selectable?: boolean;
  selectedElements?: (ids: number[]) => void;
}

const range = (n: number): number[] =>
  n < 1 ? [] : Array.from({ length: n }, (_, i) => i + 1);

export function DataTable<TData extends { orderItemId: number }>({
  columns,
  data,
  selectable = true,
  selectedElements,
}: DataTableProps<TData>) {
  /** selected orderItemId'ler */
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageCount = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data.length, pageSize]
  );

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageIndex, pageSize]);

  const toggleRow = useCallback(
    (rowId: number) => {
      setSelectedRows((prev) => {
        const next = new Set(prev);
        next.has(rowId) ? next.delete(rowId) : next.add(rowId);
        selectedElements?.(Array.from(next));
        return next;
      });
    },
    [selectedElements]
  );

  const toggleAllPage = useCallback(() => {
    const pageIds = paginatedData.map((r) => r.orderItemId);

    setSelectedRows((prev) => {
      const next = new Set(prev);
      const allSelected = pageIds.every((id) => next.has(id));

      if (allSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }

      selectedElements?.(Array.from(next));
      return next;
    });
  }, [paginatedData, selectedElements]);

  const isAllPageSelected = useMemo(
    () =>
      paginatedData.length > 0 &&
      paginatedData.every((r) => selectedRows.has(r.orderItemId)),
    [paginatedData, selectedRows]
  );

  const handlePageSizeChange = useCallback(
    (v: string) => {
      const newPageSize = Number(v);
      setPageSize((oldPageSize) => {
        setPageIndex((oldPageIndex) => {
          const currentFirstItem = oldPageIndex * oldPageSize;
          const newPageIndex = Math.floor(currentFirstItem / newPageSize);
          return Math.min(
            newPageIndex,
            Math.ceil(data.length / newPageSize) - 1
          );
        });
        return newPageSize;
      });
    },
    [data.length]
  );

  const displayStart = pageSize * pageIndex + 1;
  const displayEnd = Math.min(pageSize * (pageIndex + 1), data.length);

  return (
    <div className="space-y-4 min-w-xl text-xs">
      <div className="rounded-md border stripped">
        <Table>
          <TableHeader className="bg-[#f6f3f3]">
            <TableRow>
              {selectable && (
                <TableHead>
                  <Checkbox
                    checked={isAllPageSelected}
                    onCheckedChange={toggleAllPage}
                    aria-label="Select all on this page"
                  />
                </TableHead>
              )}

              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length ? (
              paginatedData.map((row) => {
                const rowId = row.orderItemId;
                const isSelected = selectedRows.has(rowId);

                return (
                  <TableRow key={rowId} data-state={isSelected && "selected"}>
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(rowId)}
                          aria-label="select row"
                        />
                      </TableCell>
                    )}

                    {columns.map((col) => (
                      <TableCell key={String(col.key)}>
                        {col.render ? col.render(row) : String(row[col.key])}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-24 text-center"
                >
                  Data not found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[3, 5, 10, 20].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center">
          <span className="mr-2">
            {displayStart} - {displayEnd} of {data.length}
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {range(pageCount).map((v) => (
            <Button
              key={v}
              variant="ghost"
              className="font-bold"
              onClick={() => setPageIndex(v - 1)}
              style={
                pageIndex + 1 === v
                  ? { color: "red", textDecoration: "underline" }
                  : {}
              }
            >
              {v}
            </Button>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPageIndex((i) => Math.min(pageCount - 1, i + 1))}
            disabled={pageIndex >= pageCount - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
