<?php

namespace App\Libs;

use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;

/**
 * Backup database and files
 */
class BackupService
{
    private $time = null;

    private $dir = null;

    private $delete_dir = null;

    public function __construct()
    {
        $now = Carbon::now();
        $this->time = $now->toDateString();
        $day = $now->day;
        $this->dir = storage_path().'/backup/daily/'.$this->time.'/';
        $sub_days = 2;
        $this->delete_dir = storage_path()
            .'/backup/daily/'
            .$now->subDays($sub_days)->toDateString().'/';
        if (! is_dir($this->dir)) {
            mkdir($this->dir, 0755, true);
        }
    }

    public function backup()
    {
        // backup database
        $this->backupDatabase();
        // backup files
        $this->backupFiles();
        $this->clearOld();
    }

    public function backupDatabase()
    {
        try {
            $password = config('database.connections.mysql.password');
            exec('mysqldump -u root -p'.$password.' --databases krera > '.$this->dir.'database.sql');
        } catch (Exception $e) {
            Log::error('Failed To Backup DB : '.$e->getMessage());
        }
    }

    public function backupFiles()
    {
        try {
            exec('cp -r '.storage_path().'/app/'.' '.$this->dir);
        } catch (Exception $e) {
            Log::error('Failed To Backup Fail: '.$e->getMessage());
        }
    }

    public function clearOld()
    {
        try {
            exec('rm -rf '.$this->delete_dir);
        } catch (Exception $e) {
            Log::error('Failed To Clear Old Backup: '.$e->getMessage());
        }
    }
}
