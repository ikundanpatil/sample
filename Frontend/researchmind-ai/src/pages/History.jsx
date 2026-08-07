import React, { useState } from 'react';
import { useNavigate } from 'react_router-dom';
import { History as HistoryIcon, Eye, Trash2, PlusCircle, Clock, AlertTriangle } from 'lucide-react';
import { useResearch } from '../context/ResearchContext';
import Table from '../components/Table';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';

const History = () => {
  const navigate = useNavigate();
  const { historyList, deleteHistoryItem } = useResearch();
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  const columns = [
    {
      header: 'Research Topic',
      accessor: 'topic',
      sortable: true,
      render: (row) => (
        <div className="space-y-1">
          <p className="font-semibold text-zinc-200 hover:text-white transition-colors line-clamp-1">
            {row.topic}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
            <span>{row.sourcesCount} Sources</span>
            <span>•</span>
            <span className="text-white">{row.depth}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Date',
      accessor: 'date',
      sortable: true,
      className: 'w-32',
      render: (row) => <span className="font-mono text-xs text-zinc-400">{row.date}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      className: 'w-32',
      render: (row) => (
        <Badge
          variant={row.status === 'Completed' ? 'success' : row.status === 'In Progress' ? 'cyan' : 'warning'}
          glow={row.status === 'In Progress'}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Duration',
      accessor: 'duration',
      className: 'w-28',
      render: (row) => (
        <span className="flex items-center gap-1 text-xs text-zinc-400 font-mono">
          <Clock className="w-3 h-3" />
          {row.duration}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      className: 'w-32 text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              navigate('/report');
            }}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors cursor-pointer"
            title="Open Report"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSelectedToDelete(row)}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Delete Record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="cyan" glow icon={HistoryIcon}>
              Audit Trail & Execution Logs
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Autonomous Research History</h1>
          <p className="text-xs text-zinc-400">Search and review past agent execution runs and exported whitepapers.</p>
        </div>

        <Button variant="primary" size="md" icon={PlusCircle} onClick={() => navigate('/new-research')}>
          New Research
        </Button>
      </div>

      {/* Table Component */}
      <Table columns={columns} data={historyList} searchKey="topic" />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(selectedToDelete)}
        onClose={() => setSelectedToDelete(null)}
        title="Delete Research Record"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setSelectedToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                deleteHistoryItem(selectedToDelete.id);
                setSelectedToDelete(null);
              }}
            >
              Delete Record
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-3 py-2">
          <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-200">
              Are you sure you want to delete this research record?
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              "{selectedToDelete?.topic}". This action will permanently purge stored embeddings and generated report caches.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default History;
