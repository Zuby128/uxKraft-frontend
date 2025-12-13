// components/data-table.tsx
import { useState, useMemo } from "react";
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

interface DataTableProps<TData> {
  columns: {
    key: keyof TData | "select";
    header: string;
    render?: (row: TData) => React.ReactNode;
  }[];
  data: TData[];
}

const range = (n: number): number[] => {
  if (n < 1) {
    return [];
  } else {
    return Array.from({ length: n }, (_, i) => i + 1);
  }
};

export function DataTable<TData extends Record<string, any>>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageCount = Math.ceil(data.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageIndex, pageSize]);

  const selectedCount = selectedRows.size;

  const toggleAllPage = () => {
    if (selectedCount === paginatedData.length) {
      setSelectedRows((prev) => {
        const next = new Set(prev);
        paginatedData.forEach((_, idx) =>
          next.delete(pageIndex * pageSize + idx)
        );
        return next;
      });
    } else {
      setSelectedRows((prev) => {
        const next = new Set(prev);
        paginatedData.forEach((_, idx) => next.add(pageIndex * pageSize + idx));
        return next;
      });
    }
  };

  const toggleRow = (index: number) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);

      console.log(index);
      return next;
    });
  };

  const isAllPageSelected =
    paginatedData.length > 0 &&
    paginatedData.every((_, idx) =>
      selectedRows.has(pageIndex * pageSize + idx)
    );

  const isSomePageSelected =
    paginatedData.some((_, idx) =>
      selectedRows.has(pageIndex * pageSize + idx)
    ) && !isAllPageSelected;

  return (
    <div className="space-y-4 min-w-xl">
      {/* Üst bilgi: seçilen satır sayısı + sayfa başına satır */}

      <p className="text-sm text-muted-foreground">
        {selectedCount} satır seçildi
      </p>

      {/* Tablo */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#f6f3f3]">
            <TableRow>
              {/* Başlık checkbox */}
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllPageSelected}
                  onCheckedChange={toggleAllPage}
                  aria-label="Select all"
                />
              </TableHead>

              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.length ? (
              paginatedData.map((row, rowIdx) => {
                const globalIndex = pageIndex * pageSize + rowIdx;
                const isSelected = selectedRows.has(globalIndex);

                return (
                  <TableRow
                    key={globalIndex}
                    data-state={isSelected && "selected"}
                  >
                    {/* Satır checkbox */}
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(globalIndex)}
                        aria-label="Satırı seç"
                      />
                    </TableCell>

                    {/* Diğer sütunlar */}
                    {columns.map((col) => (
                      <TableCell key={String(col.key)}>
                        {col.render ? col.render(row) : row[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <Select
              value={`${pageSize}`}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPageIndex(0);
              }}
            >
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
        </div>

        <div className="flex items-center">
          <span className="mr-2">
            {pageSize * pageIndex + 1} -{" "}
            {pageSize * (pageIndex + 1) > data.length
              ? data.length
              : pageSize * (pageIndex + 1)}{" "}
            of {data.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {range(data.length / pageSize < 1 ? 1 : data.length / pageSize).map(
            (v) => (
              <Button
                key={`v${v}`}
                variant="ghost"
                className="flex gap-1 font-bold"
                onClick={() => setPageIndex(v - 1)}
                style={
                  pageIndex + 1 === v
                    ? {
                        color: "red",
                        textDecoration: "underline",
                      }
                    : {}
                }
              >
                {v}
              </Button>
            )
          )}
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
