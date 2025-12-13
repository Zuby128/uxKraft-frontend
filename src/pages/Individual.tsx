import { DataTable } from "@/components/common/DataTable";
import IndividualItemDetails from "@/components/individual/IndividualItemDetails";
import { Button } from "@/components/ui/button";
import { useRightSidebarStore } from "@/store/RightSidebarStore";

const users = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@example.com",
    age: 34,
    city: "İstanbul",
    role: "Yönetici",
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    email: "ayse.kaya@example.com",
    age: 28,
    city: "Ankara",
    role: "Editör",
  },
  {
    id: 3,
    name: "Mehmet Demir",
    email: "mehmet.demir@example.com",
    age: 42,
    city: "İzmir",
    role: "Geliştirici",
  },
  {
    id: 4,
    name: "Fatma Şahin",
    email: "fatma.sahin@example.com",
    age: 31,
    city: "Bursa",
    role: "Tasarımcı",
  },
  {
    id: 5,
    name: "Ali Çelik",
    email: "ali.celik@example.com",
    age: 29,
    city: "Antalya",
    role: "Geliştirici",
  },
  {
    id: 6,
    name: "Zeynep Öztürk",
    email: "zeynep.ozturk@example.com",
    age: 35,
    city: "Adana",
    role: "Analist",
  },
  {
    id: 7,
    name: "Mustafa Aydın",
    email: "mustafa.aydin@example.com",
    age: 27,
    city: "Konya",
    role: "Stajyer",
  },
  {
    id: 8,
    name: "Elif Arslan",
    email: "elif.arslan@example.com",
    age: 33,
    city: "Gaziantep",
    role: "Yönetici",
  },
  {
    id: 9,
    name: "Emre Polat",
    email: "emre.polat@example.com",
    age: 30,
    city: "Trabzon",
    role: "Geliştirici",
  },
  {
    id: 10,
    name: "Seda Erdoğan",
    email: "seda.erdogan@example.com",
    age: 26,
    city: "Eskişehir",
    role: "Pazarlama",
  },
];

function Individual() {
  const { openBar } = useRightSidebarStore();
  const columns: any = [
    { key: "select", header: "" }, // checkbox için boş başlık
    { key: "name", header: "Ad" },
    { key: "email", header: "E-posta" },
    {
      key: "age",
      header: "Yaş",
      render: (row: any) => <Button variant="default">{row.age}</Button>,
    },
  ];
  return (
    <div>
      Home Page
      <DataTable columns={columns} data={users} />
      <div>
        <Button
          onClick={() => openBar("Item Name #003", <IndividualItemDetails />)}
        >
          open
        </Button>
      </div>
    </div>
  );
}

export default Individual;
